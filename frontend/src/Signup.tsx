export default function Signup() {

async function signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = {
      email: form.email.value,
      userName: form.userName.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value
    }
    const response = await fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    console.log(result)
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content lg:w-1/2 s:w-1">
        <div className="card lg:w-1/2 s:w-1 bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={signup}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" name="email"/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input type="text" placeholder="user name" className="input input-bordered" name="userName"/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" name="password"/>
                <label className="label">
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Re-Enter Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" name="confirmPassword"/>
                <label className="label">
                </label>
              </div>
              <div className="form-control mt-6 gap-6">
                <button type="submit" className="btn btn-primary">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }