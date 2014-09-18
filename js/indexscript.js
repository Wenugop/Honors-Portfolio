/* Used in:
 *      index/main page
 *
 * Purpose: switch to the sign up page
 */
function signUpClicked() 
{
    window.location = "Signup.html";
}

/* Used in:
 *       index/main page
 *
 * Purpose: log in the user
 */
function loginClicked() 
{
    Parse.initialize("Ra0XskmXSBiGLtVK9udpZA2Qch6s4bGUCCxQBzDR", "gKMSaW4T5CuaoO5coUlqV05SmJh66OpvoJtrCfoZ");

    var userName = document.getElementById("iDNumBox").value;

    var password = document.getElementById("passwordBox").value;

    Parse.User.logIn(userName, password, {
      success: function(user) {
        window.location = "student_profile.html";
      },
      error: function(user, error) {
	var message = document.getElementById("incorrect");
        message.innerHTML = "Incorrect Student ID Number or Password";
	message.style.color = "red";
      }
    });
}

/* Used in:
 *        Signup page
 *
 * Purpose: sign up a user
 */

function signMeUp() {
  Parse.initialize("Ra0XskmXSBiGLtVK9udpZA2Qch6s4bGUCCxQBzDR", "gKMSaW4T5CuaoO5coUlqV05SmJh66OpvoJtrCfoZ");

  var userName = document.getElementById("iDNumBox").value;
  var password = document.getElementById("passwordBox").value;
  var rePassword = document.getElementById("repasswordBox").value;
  var wrongPassword = document.getElementById("incorrect");
  var untrue = false;

  if(password != rePassword) {
    wrongPassword.innerHTML = "Passwords Do Not Match. Try Again.";
    wrongPassword.style.color = "red";
  }
  else {
    var user = new Parse.User();
    user.set("username", userName);
    user.set("password", password);
    user.set("administrator", untrue);

    user.signUp(null, {
      success: function(user) {
        Parse.User.logIn(userName, password, {
          success: function(user) {
            window.location = "student_profile.html";
          },
          error: function(user, error) {
	    //impossible to reach here since user just signed up
          }
        }); 

      },
      error: function(user, error) {
        wrongPassword.innerHTML = "User Already Has An Account.";
        wrongPassword.style.color = "red";
      }
    });
  }
}


/* Used in:
 *      sign up page
 *
 * Purpose: switch to the log in page
 */
function backUp() {
    window.location = "index.html";
}