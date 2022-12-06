//#region Get all Users from API

window.onload = function(){ 
    getAllMedia();
  };
  
//#endregion
  
//#region Create new Media

uploadMediaForm.onsubmit = async (e) => {
  e.preventDefault();

  var response = await createMedia(uploadMediaForm);

  let result = await response.json();

  if(response.status == 200){
    toggleUploadMediaModal();
    alert(result);
  }else{
    alert(result);
  }
};

//#endregion
 
    
