<template>
    <div id="headerM">
        <div class="buttonH auth" v-if="!showauth" @click="profile">
            My Profile
        </div>
        <div class="buttonH" v-if="showauth">
            <a href="/signup" class="auth">SignUp</a>
        </div>
        <div>
            <p>Welcome To {{ name }}</p>
        </div>
        <div class="buttonH" v-if="showauth">
            <a href="/login" class="auth">Login</a>
        </div>
        <div class="buttonH auth" v-if="!showauth" @click="signout">
            Signout
        </div>
    </div>
    </template>
      
    <script>
    import { defineComponent } from 'vue';
    
    export default defineComponent({
        data(){
            return{
                name: "Licenger"
            }
        },
        props:['showauth'],
        methods: {
            signout(){
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                localStorage.removeItem('name')
                localStorage.removeItem('email')
                window.location.reload()
            },
            profile(){
                this.$router.push('/profile')
            }
        }
    })
    </script>
      
    <style>
    #headerM{
        display: flex;
        justify-content: space-between;
        font-size: 25px;
        color: #f6efd1;
        background-color:#00A9E0;
    }
    
    .buttonH{
        align-content: center;
        margin-left: 15px;
        margin-right: 20px;
    }
    
    .auth{
        color:#f6efd1;
        text-decoration: none;
    }
    .auth:hover{
        color: #000000;
        cursor: pointer;
    }
    </style>