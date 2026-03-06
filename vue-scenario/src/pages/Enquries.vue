<script setup>
 import styles from '../css/Enquiries.module.css'
</script>

<template>
    <div :class= "styles.Epg">
            <h1 :class= "styles.Etitle">Enquiries</h1>

            <div>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdHI1IaHtegoePKdwNJpCMfEZuVJWItrlj_L3aNdKC0iMN_jg/viewform?embedded=true"
                    marginheight="0" 
                    marginwidth="0"
                    title='Enquires Form'
                    :class="styles.form"
                >
                    Loading…
                    
                </iframe>
            </div>
        </div>
</template>