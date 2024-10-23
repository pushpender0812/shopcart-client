import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./css/Login.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/Auth';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {

	const navigate = useNavigate()

	const {storeTokenInloclStr,isLoggedIn} = useAuth()

	if (isLoggedIn) {
		navigate("/")
	}

  

    // const [user,setUser] = useState({
    //     email:"",
    //     password:""
    // })  

    // const handleChange = (e) =>  {
    //     let name = e.target.name;
    //     let value = e.target.value

    //     setUser({
    //         ...user,
    //         [name]:value,
    //     })
    // }

	const formik = useFormik({
		initialValues:{
			email:'',
			password:''
		},
		validationSchema:Yup.object({
			email:Yup.string().email().required("Email is required to Login in Your Account"),
			password:Yup.string().min(6).required("Password is required to Login")
		}),
		onSubmit:async(values) => {
			try {

				const response = await fetch(`http://localhost:3000/api/login`,{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify(values),
				})
	
	
				console.log("While login User",response);
				
	
				const res_data = await response.json()
	
				console.log("LoginIn token",res_data.token);
	
				if (response.ok) {
	
					storeTokenInloclStr(res_data.token)
					
					toast.success("Login Success")
					navigate("/")
				} else {
					// console.log("Error While Login Not response");
					toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
				}
	
			} catch (error) {
				console.log("Error while login user",error);
			} 
		}
	})

    // const handleSubmit = async(e) => {
    //     e.preventDefault()
    //     // console.log("login submit");
        
    // }

  return (
    <>
      <main>
	<section class="p-0 d-flex align-items-center position-relative overflow-hidden">
	
		<div class="container-fluid">
			<div style={{marginTop:'100px'}} class="row">
			
				<div  class="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
					<div class="p-3 p-lg-5" >
					
						<div class="text-center">
							<h2 class="fw-bold">Welcome to our largest Online Shopping Platform</h2>
							<p class="mb-0 h6 fw-light">Let's Buy something new today!</p>
						</div>
		
						<img src="assets/images/element/02.svg" class="mt-5" alt=""/>
				
						<div class="d-sm-flex mt-5 align-items-center justify-content-center">
						
							<ul class="avatar-group mb-2 mb-sm-0">
								<li class="avatar avatar-sm">
									<img class="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar"/>
								</li>
								<li class="avatar avatar-sm">
									<img class="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt="avatar"/>
								</li>
								<li class="avatar avatar-sm">
									<img class="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="avatar"/>
								</li>
								<li class="avatar avatar-sm">
									<img class="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt="avatar"/>
								</li>
							</ul>
						
							<p class="mb-0 h6 fw-light ms-0 ms-sm-3">40M+ Customer joined us, now it's your turn.</p>
						</div>
					</div>
				</div>

	
				<div class="col-12 col-lg-6 m-auto">
					<div class="row my-5">
						<div class="col-sm-10 col-xl-8 m-auto">
					
							<span class="mb-0 fs-1">👋</span>
							<h1 class="fs-2">Login into Your Account!</h1>
							<p class="lead mb-4">Nice to see you! Please log in with your account.</p>

							
							<form onSubmit={formik.handleSubmit}>
								
								<div class="mb-4">
									<label for="exampleInputEmail1" class="form-label">Email address *</label>
									<div class="input-group input-group-lg">
										<span class="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i class="bi bi-envelope-fill"></i></span>
										<input type="email" class="form-control border-0 bg-light rounded-end ps-1" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="E-mail" name='email' value={formik.values.email} id="exampleInputEmail1"/>
									</div>
								</div>
								{formik.touched.email && formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div> : ''}
						
								<div class="mb-4">
									<label for="inputPassword5" class="form-label">Password *</label>
									<div class="input-group input-group-lg">
										<span class="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i class="fas fa-lock"></i></span>
										<input type="password" class="form-control border-0 bg-light rounded-end ps-1" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="password" name='password' value={formik.values.password} id="inputPassword5"/>
									</div>
									<div id="passwordHelpBlock" class="form-text">
										Your password must be 6 characters at least 
									</div>
								</div>
								{formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
								<div class="mb-4 d-flex justify-content-between mb-4">
									<div class="form-check">
										{/* <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
										<label class="form-check-label" for="exampleCheck1">Remember me</label> */}
									</div>
									<div class="text-primary-hover">
										{/* <a href="forgot-password.html" class="text-secondary">
											<u>Forgot password?</u>
										</a> */}
									</div>
								</div>
							
								<div class="align-items-center mt-0">
									<div class="d-grid">
										<button class="btn btn-primary mb-0" type="submit">Login</button>
									</div>
								</div>
							</form>
							

							
							<div class="row">
							
								<div class="position-relative my-4">
									<hr/>
									<p class="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
								</div>

								
								{/* <div class="col-xxl-6 d-grid">
									<a href="#" class="btn bg-google mb-2 mb-xxl-0"><i class="fab fa-fw fa-google text-white me-2"></i>Login with Google</a>
								</div>
								
								<div class="col-xxl-6 d-grid">
									<a href="#" class="btn bg-facebook mb-0"><i class="fab fa-fw fa-facebook-f me-2"></i>Login with Facebook</a>
								</div> */}
							</div>

						
							<div class="mt-4 text-center">
								<span>Don't have an account? <a href="/register">Signup here</a></span>
							</div>
						</div>
					</div> 
				</div>
			</div> 
		</div>
	</section>
</main>
    </>
  )
}

export default Login
