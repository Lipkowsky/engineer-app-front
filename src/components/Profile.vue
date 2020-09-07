<template>
<b-container class="bv-example-row">
    <b-row>
        <b-col></b-col>
        <b-col>
            <div>
                <b-card title="Użytkownik" style="max-width: 20rem;" class="mt-5 text-center">
                    <div class="profilLogo">
                        <font-awesome-icon icon="user-tie" size="4x" />
                    </div>
                    <b-card-text class="mt-2">
                        <span class="first"> Imię: </span>{{name}}
                    </b-card-text>
                    <b-card-text>
                        <span class="first">Nazwisko: </span>{{surname}}
                    </b-card-text>
                    <b-card-text>
                        <span class="first">Stanowisko pracy: </span>{{dutyName}}
                    </b-card-text>
                    <b-card-text>
                        <span class="first">Sektor pracy: </span>{{sectorName}}
                    </b-card-text>
                </b-card>
            </div>
        </b-col>
        <b-col></b-col>
    </b-row>

</b-container>
</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            name: this.$store.state.users.user.name,
            surname: this.$store.state.users.user.surname,
            dutyName: this.$store.state.users.user.dutyName,
            sectorName: this.$store.state.users.user.sectorName
        }
    },

}
</script>

<style>
b-card {
    text-align: center;
    margin-top: 30px;
}
.first{
    font-weight: bold;
}
</style>
