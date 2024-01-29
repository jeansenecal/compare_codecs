import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  async function login (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    if(!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    const res: Response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    const data = await res.json();
    console.log(data);
    if(data.msg === "success") {
      console.log("Logged in successfully");
        navigate('/');
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content lg:w-1/2 s:w-1">
      <div className="card lg:w-1/2 s:w-1 bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={login}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" className="input input-bordered" name="email"/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" name="password"/>
              <label className="label">
              </label>
            </div>
            <div className="form-control mt-6 gap-6">
              <button type="submit" className="btn btn-primary">Login</button>
              <Link to="/signup" className="btn btn-secondary">Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
