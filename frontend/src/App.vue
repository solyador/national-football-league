<template>
    <div class="container">
        <h1> {{ message }} </h1>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            message: 'Using parcel',
        };
    },    
};
</script>

<style scoped>
    .container {
        width: 600px;
        margin: 50px auto;
        text-align: center;
    }
</style>

