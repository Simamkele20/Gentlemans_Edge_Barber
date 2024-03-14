<template>
    <div class=" mx-auto mt-5">
        <div class="card bg-black">
            <slot name="cardHeader"> </slot>
        </div>
        <div class="card-body">
            <slot name="cardBody"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardView"
}
</script>

<style src="../assets/css/style.css"></style>