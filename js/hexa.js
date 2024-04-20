let session = new Session();
session_id = session.getSession();

if(session_id !== "") {
    async function populateUserData(){
        let user = new User();
        user = await user.get(session_id);

        document.querySelector('#username').innerText = user.username;
        document.querySelector('#email').innerText = user.email;

        document.querySelector('#korisnicko_ime').value = user.username;
        document.querySelector('#edit_email').value = user.email;
    }

    populateUserData()

} else {
    window.location.href = "/";
}

document.querySelector('#logout').addEventListener('click', () =>{
    session.destroySession();
    window.location.href = 'index.html';
})

document.querySelector('#editAccount').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'block';
})

document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'none';
})

document.querySelector('#editForm').addEventListener('submit', e => {
    e.preventDefault();

    let user = new User();
    user.username = document.querySelector('#korisnicko_ime').value;
    user.email = document.querySelector('#edit_email').value;
    user.edit();
});

document.querySelector('#deleteProfile').addEventListener('click', e =>{
    e.preventDefault();

    let text = 'Da li ste sigurni da zaista zelite da obrisete profil?';

    if(confirm(text) === true)
    {
        let user = new User();

        user.delete();
    }
})