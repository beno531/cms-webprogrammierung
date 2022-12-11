//#region Login

loginForm.onsubmit = async (e) => {
    e.preventDefault();
  
    var response = await login(loginForm);
  
    if(response.status == 200){

        location.href = '/cms/dashboard';

    }else{
      alert("Login ist fehlgeschlagen!");
    }
  };
  
//#endregion