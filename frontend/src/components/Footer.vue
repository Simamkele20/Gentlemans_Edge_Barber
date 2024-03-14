<template>
    <div class="container-fluid pt-1 bg-black accordion-item text-center">
        <div class="row">
            <p class="footer1 lead text-white   "> Gentleman's Edge Barber &copy;
                <span> {{ currYear }}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "footerComp",
    data() {
        return {
            currYear: new Date().getFullYear()
        }
    }

}
</script>

<style scoped>
.row{

    padding-bottom: -20px;
}
</style>