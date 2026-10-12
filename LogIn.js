function login() 
{
    let username=document.getElementById("username");
     let password=document.getElementById("password");
    if (username.value=="מיכל"&&password.value=="1234")
         {
        
    }
    else
    {
 alert("שם משתמש או סיסמא שגויים");
 if(username.value!="מיכל")
 {
username.style.border="2px solid red"
 }
 if(password.value!="1234")
 {
password.style.border="2px solid red"
 }
    }
}