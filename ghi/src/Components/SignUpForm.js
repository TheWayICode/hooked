import React, {useState} from 'react';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name;
        data.email;
        data.password;

        const userUrl = `${process.env.REACT_APP_HOOKED_API_HOST}/api/users`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(userUrl, fetchConfig);
        if (response.ok) {
            setName("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className=''>
            <div className=''>
                <div className=''>
                    <h1>Join us and be a master baiter!</h1>
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <input onChange={setName} value={name} placeholder='name' required type='text' name='name'/>
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className=''>
                            <input onChange={setEmail} value={email} placeholder='email' required type='text' name='email'/>
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className=''>
                            <input onChange={setPassword} value={password} placeholder='password' required type='text' name='password'/>
                            <label htmlFor='password'>Password</label>
                        </div>
                        <button className=''>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup;
