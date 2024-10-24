<template>
    <div id="headerP">
        <div class="buttonH auth" @click="profile">
            Home Page
        </div>
        <div>
            <p>{{ name }}</p>
        </div>
        <div class="buttonH auth" v-if="!showauth" @click="signout">
            Signout
        </div>
    </div>
    <div id="Profile">
        <div class="navbar">
            <p>Options</p>
            <hr>
            <div class="buttonP" @click="this.value = 'show'">My Licenses</div>
            <div class="buttonP" @click="this.value = 'create'">Create License</div>
            <div class="buttonP" @click="this.value = 'edit'">Edit License</div>
            <div class="buttonP" @click="this.value = 'reset'">Reset password</div>
            <div class="buttonP" @click="this.value = 'update'">Update My Info</div>
        </div>
        <div class="profdata">
            <LicensePart :showLicense="value" id="LicensePartBox"/>
            <form class="profForm" @submit.prevent v-if="value == 'update'">
                <label>Name :</label>
                <input type="text" v-model="newName">
                <label>Email :</label>
                <input type="email" v-model="newEmail">

                <div class="submit">
                    <button class="create" @click="update">Submit</button>
                </div>
            </form>
            <form class="profForm" @submit.prevent v-if="value == 'reset'">
                <label>PasswordCurrent :</label>
                <input type="password" v-model="passwordCurrent" required>
                <label>Password :</label>
                <input type="password" v-model="password" required>
                <label>PasswordConfirm :</label>
                <input type="password" v-model="passwordConfirm" required>

                <div class="submit">
                    <button class="create" @click="reset">Submit</button>
                </div>
            </form>
        </div>
    </div>
    <div class="error" v-if="error.length > 0">
        {{ error }}
    </div>
</template>

<script>
import axios from 'axios';
import { getRole } from '../../utils/functions'
import LicensePart from '@/components/LicensePart.vue';

export default {
    name: "Profile",
    components: {LicensePart},
    data(){
        return{
            name: '',
            newName: '',
            email: '',
            newEmail: '',
            value: '',
            password: '',
            passwordConfirm: '',
            passwordCurrent: '',
            error: ''
        }
    },
    async beforeMount(){
        await getRole(localStorage.getItem('token'))
        this.name = localStorage.getItem('name')
        this.email = localStorage.getItem('email')
    },
    methods: {
        async update(){
            const body = {}
            if (this.newName.length > 0) body["name"] = this.newName
            if (this.newEmail.length > 0) body["email"] = this.newEmail
            try{
                const response = await axios.patch(`http://localhost:4000/users/updateMe` ,body ,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
                })
                if (response.status == 200){
                    window.location.reload()
                }
            }catch(err){
                this.error = err.message
            }
        },
        async reset(){
            const body = {
                passwordCurrent: this.passwordCurrent,
                password: this.password,
                passwordConfirm: this.passwordConfirm
            }
            try{
                const response = await axios.patch(`http://localhost:4000/users/updateMyPassword` ,body ,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
                })
                if (response.status == 200){
                    this.$router.push('/')
                    alert("password has changed")
                }
            }catch(err){
                this.error = err.message
            }
        },
        signout(){
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                localStorage.removeItem('name')
                localStorage.removeItem('email')
                this.$router.push('/')
        },
        profile(){
                this.$router.push('/')
        }
    }
}
</script>

<style>
    #headerP{
        display: flex;
        justify-content: space-between;
        font-size: 25px;
        color: #f6efd1;
        background-color:#00A9E0;
    }
    #Profile{
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        font-size: 20px;
    }
    .profdata{
        color: #f6efd1;
        background-color:#00A9E0;
        width: 76%;
        height: 400px;
        border: 2px black solid;
        border-radius: 20px;
        margin-right: 1%;
        overflow-x: auto;
    }
    .profForm{
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }
    .navbar{
        color: #f6efd1;
        background-color:#00A9E0;
        width: 20%;
        height: 400px;
        border: 2px black solid;
        border-radius: 20px;
        margin-left: 1%;
    }
    .buttonP{
        line-height: 2;
    }
    .buttonP:hover{
        color: black;
        cursor: pointer;
    }
</style>