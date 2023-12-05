import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content lg:w-1/2 s:w-1">
      <div className="card lg:w-1/2 s:w-1 bg-base-100 shadow-xl">
        <div className="card-body">
          <form action="/login" method="POST">
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
