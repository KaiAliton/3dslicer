import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CanvasViewer = ({ file }) => {
  const containerRef = useRef(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(null);
  const renderer = useRef(null);
  const controls = useRef(null);
  const mesh = useRef(null);
  const [dimensions, setDimensions] = useState(null);


  useEffect(() => {
    const currentContainer = containerRef.current;

    // Camera setup
    camera.current = new THREE.PerspectiveCamera(
      75,
      currentContainer.clientWidth / currentContainer.clientHeight,
      0.1,
      1000
    );
    camera.current.position.set(0, 2, 5);

    // Renderer setup
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    renderer.current.setClearColor(0xf0f0f0);
    currentContainer.appendChild(renderer.current.domElement);

    // Controls
    controls.current = new OrbitControls(camera.current, renderer.current.domElement);
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.05;
    controls.current.minDistance = 1;
    controls.current.maxDistance = 300;

    // Lighting
    scene.current.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.current.add(directionalLight);

    // Grid floor
    const gridSize = 220;
    const gridDivisions = 20;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x888888);
    gridHelper.position.y = -0.01; // Чтобы не было z-fighting с моделями
    scene.current.add(gridHelper);

    // Axes helper
    scene.current.add(new THREE.AxesHelper(100));

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.current.update();
      renderer.current.render(scene.current, camera.current);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = currentContainer.clientWidth;
      const height = currentContainer.clientHeight;
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentContainer.removeChild(renderer.current.domElement);
      renderer.current.dispose();
      controls.current.dispose();
      scene.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!file) return;

    const loader = new STLLoader();
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        // Cleanup previous model
        if (mesh.current) {
          scene.current.remove(mesh.current);
          mesh.current.geometry.dispose();
          mesh.current.material.dispose();
          setDimensions(null);
        }

        // Load new model
        const geometry = loader.parse(e.target.result);
        geometry.center();

        // Calculate dimensions
        const bbox = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);
        const size = new THREE.Vector3();
        bbox.getSize(size);
        setDimensions({
          x: size.x.toFixed(1),
          y: size.y.toFixed(1),
          z: size.z.toFixed(1)
        });

        // Position model on the floor
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        geometry.translate(-center.x, -bbox.min.y, -center.z);

        // Material setup
        const material = new THREE.MeshPhongMaterial({
          color: 0x3b82f6,
          specular: 0xffffff,
          shininess: 100,
        });

        mesh.current = new THREE.Mesh(geometry, material);
        scene.current.add(mesh.current);

        // Camera positioning
        const sphere = new THREE.Sphere();
        bbox.getBoundingSphere(sphere);

        camera.current.position.set(
          sphere.center.x,
          sphere.center.y + sphere.radius * 0.5,
          sphere.center.z + sphere.radius * 2
        );
        controls.current.target.copy(sphere.center);
        controls.current.update();

      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full" />

      {dimensions && (
        <div className="absolute bg-base-100 bottom-4 left-4  p-4 rounded-lg shadow-md text-base-content">
          <h3 className="font-bold mb-2">Model Dimensions (mm)</h3>
          <div className="grid grid-cols-2 gap-2">
            <span>Width (X):</span>
            <span className="font-mono">{dimensions.x}</span>
            <span>Height (Y):</span>
            <span className="font-mono">{dimensions.y}</span>
            <span>Depth (Z):</span>
            <span className="font-mono">{dimensions.z}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const PrintForm = () => {
  const [file, setFile] = useState(null);
  const [material, setMaterial] = useState('PLA');
  const [infill, setInfill] = useState(20);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState('IDLE');

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`https://localhost:5665/task/${taskId}`);
        const data = await response.json();


        if (data.status === 'success') {
          clearInterval(interval);
          setResults(data.result);
        }
        if (data.status === 'failure') {
          clearInterval(interval);
          setError('Calculation failed');
        }
      } catch (err) {
        clearInterval(interval);
        setError('Connection error');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [taskId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isValidExtension = selectedFile.name.toLowerCase().endsWith('.stl');
    const isValidSize = selectedFile.size <= 10 * 1024 * 1024;

    if (!isValidExtension) {
      setError('Invalid file type. Please upload a .stl file');
      e.target.value = '';
      setFile(null);
      return;
    }

    if (!isValidSize) {
      setError('File size exceeds 10MB limit');
      e.target.value = '';
      setFile(null);
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a model file');
      return;
    }
    const isValidExtension = file.name.toLowerCase().endsWith('.stl');
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidExtension || !isValidSize) {
      setError('Invalid file. Please select a valid .stl file under 10MB.');
      setFile(null);
      return;
    }

    const formData = new FormData();
    formData.append('model', file);
    formData.append('material', material);
    formData.append('infill', infill.toString());

    setIsSubmitting(true);
    setError('');
    setTaskStatus('PENDING');

    try {
      const response = await fetch('https://localhost:5665/calculate', {
        method: 'POST',
        body: formData,
      });
      const { task_id } = await response.json();
      setTaskId(task_id);
      setTaskStatus('PENDING');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      {!results ? (
        <dialog id="my_modal_1" className="modal">
          <div className="max-w-md mx-auto p-8 text-base-content relative">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-ghost btn-md btn-circle absolute right-8">✕</button>
            </form>
            <form onSubmit={handleSubmit} className=" bg-base-100 p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-6">3D Print Calculator</h1>
              {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
              <div className="mb-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Pick a file</legend>
                  <input
                    type="file"
                    accept=".stl"
                    onChange={handleFileChange}
                    className="file-input"
                    required
                  />
                  <label className="fieldset-label">Max size 10MB</label>
                </fieldset>
              </div>
              <div className="mb-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Select material</legend>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="select"
                  >
                    <option value="PLA">PLA</option>
                    <option value="ABS">ABS</option>
                  </select>
                </fieldset>
              </div>
              <div className="mb-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Infill (%)</legend>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={infill}
                    onChange={(e) => setInfill(e.target.value)}
                    className="input"
                    required
                  />
                </fieldset>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn py-2 px-4 rounded-md  disabled:bg-gray-400"
              >
                {taskStatus === 'PENDING' ? 'Calculating...' : 'Calculate'}
              </button>
            </form>
          </div>
        </dialog>
      ) : (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl md:h-2/3 ">
            <div className="flex flex-col relative w-full h-full ">
              <div className="relative w-full h-full">
                <CanvasViewer file={file} />
              </div>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-lg btn-circle absolute right-2 top-2">✕</button>
              </form>
              <div className="md:absolute md:max-w-64 bg-base-100 left-4 top-4 p-4 shadow-md text-base-content">

                <h2 className="text-xl font-bold mb-4">Print Details</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="">Print Time </span>
                    <span className="font-medium"> {results.print_time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="">Material Used </span>
                    <span className="font-medium"> {results.material_grams}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="">Total Cost </span>
                    <span className="font-medium"> {results.cost} rub.</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Order placed!')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PrintForm;