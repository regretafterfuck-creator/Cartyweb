function showPage(page){

let content=document.getElementById("content");


if(page=="dashboard"){

content.innerHTML=`

<h1>Dashboard</h1>

<div class="box">
<h2>Account Overview</h2>
<p>Your balance and activity will appear here.</p>
</div>

`;

}



if(page=="wallet"){

content.innerHTML=`

<h1>Wallet</h1>

<div class="box">

<h2>Add Fund</h2>

<input placeholder="Amount">

<button>Add Money</button>

</div>


<div class="box">

<h2>Transaction History</h2>

<p>No transactions yet</p>

</div>

`;

}



if(page=="profile"){

content.innerHTML=`

<h1>Profile</h1>

<div class="box">

<h2>User Profile</h2>

<p>Name: User</p>
<p>Email: user@email.com</p>

<button>Edit Profile</button>

</div>

`;

}



if(page=="settings"){

content.innerHTML=`

<h1>Settings</h1>

<div class="box">

<h2>Appearance</h2>

<select>
<option>Dark Theme</option>
<option>Light Theme</option>
<option>Blue Theme</option>
</select>


<h2>Font</h2>

<select>
<option>Arial</option>
<option>Georgia</option>
<option>Verdana</option>
</select>


</div>

`;

}

}
