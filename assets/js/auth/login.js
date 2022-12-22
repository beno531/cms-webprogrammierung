//#region Login

loginForm.onsubmit = async (e) => {
    e.preventDefault();
  
    var response = await login(loginForm);
  
    if(response.status == 200){


      let result = await response.json();
      console.log(result);
      sessionStorage.setItem("jwt_auth", result);
      //location.href = '/cms/dashboard';

    }else{
      alert("Login ist fehlgeschlagen!");
    }
  };
  
//#endregion