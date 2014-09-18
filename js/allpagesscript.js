/* used in:
    settings page
    slo1
    slo2
    slo3
    slo4
    slo5
    student profile page

Purpose: log out the user
*/
function logMeOut()
{
    Parse.initialize("Ra0XskmXSBiGLtVK9udpZA2Qch6s4bGUCCxQBzDR", 
		     "gKMSaW4T5CuaoO5coUlqV05SmJh66OpvoJtrCfoZ");

    Parse.User.logOut();

    window.location = "index.html";
}

/* used in:
      student profile page
      slo1
      slo2
      slo3
      slo4
      slo5

Purpose: go to the settings page where you can change your password
*/
function settingsPage() {
    window.location = "settings.html";
}

/* used in:
    settings page
    slo1
    slo2
    slo3
    slo4
    slo5
    student profile page

Purpose: makes sure the user is logged in.
*/
function userCheck() {
    Parse.initialize("Ra0XskmXSBiGLtVK9udpZA2Qch6s4bGUCCxQBzDR", 
	             "gKMSaW4T5CuaoO5coUlqV05SmJh66OpvoJtrCfoZ");
//console.log(Parse.User.current().get("username"));
    if(Parse.User.current() == null) {
	    window.location = "index.html";
    }
}

/* used in:
    student profile page

Purpose: Fills in the student ID on the student profile page with the username
*/
function userCheckProfile() {
    Parse.initialize("Ra0XskmXSBiGLtVK9udpZA2Qch6s4bGUCCxQBzDR", 
	             "gKMSaW4T5CuaoO5coUlqV05SmJh66OpvoJtrCfoZ");

    if(Parse.User.current() == null) {
	    window.location = "index.html";
    }
    else {
	document.getElementById("iDNumBox").innerHTML = 
	    Parse.User.current().get("username");
    }
}

/* used in:
    slo1
    slo2
    slo3
    slo4
    slo5
    student profile page

Purpose: Save the information that a user types in to DB
*/
function saveProfile() {
    Parse.initialize("Ra0XskmXSBiGLtVK9udpZA2Qch6s4bGUCCxQBzDR", 
	             "gKMSaW4T5CuaoO5coUlqV05SmJh66OpvoJtrCfoZ");

    //get the values of the various textboxes.
    var uName = document.getElementById("studentNameBox").value;
    var uID = Parse.User.current().get("username");
    var transferSem = document.getElementById("transferSemBox").value;
    var c1 = document.getElementById("course1").value;
    var c2 = document.getElementById("course2").value;
    var c3 = document.getElementById("course3").value;
    var c4 = document.getElementById("course4").value;
    var c5 = document.getElementById("course5").value;
    var c6 = document.getElementById("course6").value;
/*
    console.log(uName);
    console.log(uID);
    console.log(transferSem);
    console.log(c1);
    console.log(c2);
    console.log(c3);
    console.log(c4);
    console.log(c5);
    console.log(c6);
*/
    //create the object to save to parse
    var UserFiles = Parse.Object.extend("UserFiles");
    var uFiles = new UserFiles();
    var uACL = new Parse.ACL(Parse.User.current());
    uACL.setPublicReadAccess(true);

    //fill in the various fields for this object.
    uFiles.setACL(uACL);
    uFiles.set("name", uName);
    uFiles.set("id", uID);
    uFiles.set("semester", transferSem);
    uFiles.set("course1", c1);
    uFiles.set("course2", c2);
    uFiles.set("course3", c3);
    uFiles.set("course4", c4);
    uFiles.set("course5", c5);
    uFiles.set("course6", c6);

    //uFiles.save();

    //now that the fields are filled, save it
    uFiles.save(null, {
	success: function(uFiles) {
	    //do nothing
	},
	error: function(uFiles, error) {
	    alert("something went wrong error: " + error.code + " " + 
                   error.message);
	}
    });

}

/* used in:
    settings page

Purpose: when user clicks on Change Password in the settings page, this displays
         all the necessary fields for the user to enter in their information
*/
function changePassword() {
    //grab all the necessary elements from the page
    currentPassLabel = document.getElementById("currentPWord");
    currentPassBox = document.getElementById("pBox");
    changeLabel = document.getElementById("btnChoice");
    nameBox = document.getElementById("changeBox");
    changeLabelCheck = document.getElementById("btnChoiceCheck");
    nameBoxCheck = document.getElementById("changeBoxCheck");
    passwordBtn = document.getElementById("pBtn");
    cancelButton = document.getElementById("cancelBtn");
    saveButton = document.getElementById("saveBtn");

    //display or hide themm accordingly
    passwordBtn.style.display = "none";
    currentPassLabel.innerHTML = "Current Password";
    currentPassLabel.style.display = "block";
    currentPassBox.style.display = "block";
    changeLabel.innerHTML = "New Password";
    changeLabel.style.display = "block";
    nameBox.style.display = "block";
    changeLabelCheck.innerHTML = "Retype Password";
    changeLabelCheck.style.display = "block";
    nameBoxCheck.style.display = "block";
    cancelButton.style.display = "inline-block";
    saveButton.style.display = "inline-block";
}

/* used in:
    settings page

Purpose: when the cancel button is pressed, it goes back to the inital state of 
         the page and hides/displays elements as necessary (basically the 
         opposite of the changePassword() method)
*/
function cancelChange() {
    //grab all the necessary elements from the page
    currentPassLabel = document.getElementById("currentPWord");
    currentPassBox = document.getElementById("pBox");
    changeLabel = document.getElementById("btnChoice");
    nameBox = document.getElementById("changeBox");
    changeLabelCheck = document.getElementById("btnChoiceCheck");
    nameBoxCheck = document.getElementById("changeBoxCheck");
    passwordBtn = document.getElementById("pBtn");
    cancelButton = document.getElementById("cancelBtn");
    saveButton = document.getElementById("saveBtn");

    //display or hide themm accordingly
    passwordBtn.style.display = "inline-block";
    currentPassLabel.style.display = "none";
    currentPassBox.style.display = "none";
    currentPassBox.value="";
    changeLabel.style.display = "none";
    nameBox.style.display = "none";
    nameBox.value="";
    changeLabelCheck.style.display = "none";
    nameBoxCheck.style.display = "none";
    nameBoxCheck.value="";
    cancelButton.style.display = "none";
    saveButton.style.display = "none";
}

/* used in:
    settings page

Purpose: when the save button is pressed, the users password is changed to the 
         password that they want.
*/
function saveMyPassword() {
    //grab the necessary elements from the page
    var password = document.getElementById("changeBox").value;
    var passwordCheck = document.getElementById("changeBoxCheck").value;
    var wrongPassword = document.getElementById("incorrect");
    var userName = Parse.User.current().get("username");
    currentPass = document.getElementById("pBox").value;

    //check to make sure the password and retyped password match
    if(password != passwordCheck) {
        wrongPassword.innerHTML = "Passwords Do Not Match. Try Again.";
        wrongPassword.style.color = "red";
    }

    else {
	var user = Parse.User.logIn(userName, currentPass, {
	    success: function(user) {
		user.set("password", password);
		user.save(null, {
		    success: function(user) {
			alert("success");
		    },
		    error: function(user, error) {
			alert("Password Was Not Saved. Try Again");
		    }
		});
	    },
	    error: function(user, error) {
		alert("Password Was Not Saved. Try Again");
	    }
        });
    }
}