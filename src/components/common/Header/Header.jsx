export default function Header({ buttonTitle, buttonAction }) {
  return (<div className="navbar px-5 py-8 mx-auto flex items-center md:flex-row flex-col">
    <div className="md:navbar-start dark:hidden">
      <img src="/logo-dark.svg" className="h-24" alt="" />
    </div>
    
    <div className="md:navbar-end">
      <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn btn-lg text-base-content btn-ghost">
        {"Calculate Print"}
      </button>
    </div>
  </div>)
}