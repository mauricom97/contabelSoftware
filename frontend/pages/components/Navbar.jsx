import BorderIcons from "../components/BorderIcons"

function Navbar (props) {
  return (
    <div className="flex items-center w-screen h-20 bg-purple-950 rounded-b-md">
      <div className=" ml-3">
        <BorderIcons />
      </div>
    </div>
  )
}


export default Navbar