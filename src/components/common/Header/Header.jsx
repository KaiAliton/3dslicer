export default function Header({ buttonTitle, buttonAction }) {
  return (<div className="navbar">
    <div className="navbar-start">
      <a className="btn btn-ghost text-xl">3DDone</a>
    </div>
    <div className="navbar-end">
      <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn">
        {"Calculate Print"}
      </button>
    </div>
  </div>)
}