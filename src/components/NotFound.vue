<template>
    <div class="boxnotfound">
        <div class="notfound">
            {{ errorMessage }} Does Not Exists
        </div>
        <router-link to="/" id="link">Go To Home Page</router-link>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name:"NotFound",
    computed: {
        errorMessage(){
            return this.$route.params.pathMatch[0]
        }
    }
})
</script>

<style>
    .boxnotfound{
        color: #f6efd1;
        background-color:#00A9E0;
        margin-right: auto;
        margin-left: auto;
        width: 30%;
        border-radius: 12px;
        margin-top: 10%;
        font-size: 30px;
        padding: 20px;
    }
    #link{
        text-decoration: none;
        color: #000000;
        line-height: 2.6;
    }
    #link:hover{
        color: #6fddd4;
    }
</style>