<template>
    <div v-if="showLicense == 'show'" v-for="license in Licenses" :key="license.name" :class="isExpiringSoon(license.expireDate)" id="box1">
        <div v-if="license != 'You havent created any License'" id="ShowAll">
            Name: {{ license.name }}<br>
            IssueDate:  {{ license.issueDate.split("T")[0] }}<br>
            ExpireDate: {{ license.expireDate.split("T")[0] }}<br>
            Status: <span :class="isExpiringSoon(license.expireDate)"> {{ license.active }}</span><br>
            <div v-if="license.properties">
                Properties:<br>
                Type => {{ license.properties.type }}<br>
                SerialNumber => {{ license.properties.serialNumber }}
            </div>
        </div>
        <div v-else id="ShowAll">
            {{ license }}
        </div>
    </div>
    <div v-if="showLicense == 'create'" >
        <form class="profForm" @submit="createLicense">
            <label>Name</label>
            <input type="text" required v-model="Name">
            <label>IssueDate</label>
            <input type="date" required v-model="IssueDate">
            <label>ExpireDate</label>
            <input type="date" required v-model="ExpireDate">
            <label>Type (optional)</label>
            <input type="text" v-model="properties.type">
            <label>SerialNumber (optional)</label>
            <input type="text" v-model="properties.serialNumber">

            <div class="submit">
                <button class="create">Create a License</button>
            </div><br>
        </form>
    </div>
    <div v-if="showLicense == 'edit'" >
        <form class="profForm" @submit="editLicense(LName)">
            <label>Name of the license you want to edit</label>
            <input type="text" required v-model="LName">
            <label>newName</label>
            <input type="text" v-model="Name">
            <label>IssueDate</label>
            <input type="date" v-model="IssueDate">
            <label>ExpireDate</label>
            <input type="date" v-model="ExpireDate">
            <label>status (active,expired)</label>
            <input type="text" v-model="status">
            <label>Type</label>
            <input type="text" v-model="properties.type">
            <label>SerialNumber</label>
            <input type="text" v-model="properties.serialNumber">

            <div class="submit">
                <button class="create">Edit License</button>
            </div><br>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return{
            error: '',
            Licenses: [],
            LName: '',
            Name: '',
            IssueDate: '',
            ExpireDate: '',
            status: '',
            properties: {
                type: '',
                serialNumber: ''
            }
        } 
    },
    props: ["showLicense"],
    watch: {
        async showLicense(val){
            if(val == 'show'){
                try{
                const response = await axios.get('http://localhost:4000/license',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.status == 200 & response.data.licenses != "no License exist"){
                    this.Licenses = [...response.data.licenses]
                }else{
                    this.Licenses = ["You havent created any License"]
                }
                }catch(err){
                    this.error = err.message
                }
            }
        }
    },
    methods: {
        isExpiringSoon(expireDate) {
            const today = new Date();
            const expDate = new Date(expireDate);
            const diffTime = expDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                return 'onedayleft';
            } else if (diffDays <= 10) {
                return 'tendaysleft';
            }
            return 'morethan10days';
        },
        async createLicense(){
            try{
                await axios.post('http://localhost:4000/license',
                {name:this.Name ,issueDate:this.IssueDate ,expireDate:this.ExpireDate ,properties:this.properties},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                }catch(err){
                    this.error = err.message
                }
        },
        async editLicense(name){
            try{
                const updatedData = {};
                if (this.Name.length > 0) updatedData.name = this.Name;
                if (this.IssueDate.length > 0) updatedData.issueDate = this.IssueDate;
                if (this.ExpireDate.length > 0) updatedData.expireDate = this.ExpireDate;
                if (this.status.length > 0) updatedData.active = this.status;
                if (this.properties.type.length > 0 || this.properties.serialNumber.length > 0) {
                    updatedData.properties = this.properties;
                }
                await axios.patch(`http://localhost:4000/license/${name}`,updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                }catch(err){
                    this.error = err.message
                }
        }
    }
})
</script>

<style>
    #box1{
        display: inline-flex;
        border-radius: 20px;
        border: 1px solid black;
        padding: 10px;
        margin: 10px;
        min-width: 250px;
        height: 160px;
        font-weight: 100;
    }
    #ShowAll{  
        color:#000000;
        text-align: left;
    }
    .tendaysleft{
        background-color: yellow;
        font-weight: bold;
    }
    .onedayleft{
        background-color: rgb(255, 87, 87);
        font-weight: bold;
    }
    .morethan10days{
        background-color: rgb(128, 233, 118);
        font-weight: bold;
    }
</style>