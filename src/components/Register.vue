<template>
<form>
    <fieldset>
        <legend>Rejestracja</legend>
        <div class="form-group">
            <label for="exampleInputEmail1">Adres e-mail</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Podaj e-email">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Hasło</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Hasło">
        </div>
        <div class="form-group">
            <label for="name">Imię</label>
            <input v-model="name" type="text" class="form-control" id="name" placeholder="Imię">
        </div>
        <div class="form-group">
            <label for="surname">Nazwisko</label>
            <input v-model="surname" type="text" class="form-control" id="surname" placeholder="Nazwisko">
        </div>
        <div class="form-group">
            <label for="exampleSelect1">Wybierz sektor pracy</label>
            <select v-model="sector_id" class="form-control" id="exampleSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select>
        </div>
        <div class="form-group">
            <label for="exampleSelect2">Wybierz obowiązki</label>
            <select v-model="duty_id" class="form-control" id="exampleSelect2">
                <option>1 - Sprzedawca</option>
                <option>2 - Kierownik</option>
                <option>3 - Magazynier</option>
            </select>
        </div>
        <div>
            <p class="redContent" v-if="error">{{error}}</p>
            <p class="greenContent" v-if="success">{{success}}</p>
        </div>
        <button class="btn btn-primary" @click="register">Zarejestruj pracownika</button>
    </fieldset>
</form>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    name: 'Register',
    data() {
        return {
            success: '',
            error: '',
            email: '',
            password: '',
            name: '',
            surname: '',
            role: 'user',
            sector_id: '',
            duty_id: '',
        }
    },
    methods: {
        async register() {
                try {
                    await AuthenticationService.register({
                        email: this.email,
                        password: this.password,
                        name: this.name,
                        surname: this.surname,
                        role: this.role,
                        sectorId: this.sector_id,
                        dutyId: this.duty_id[0]
                    })
                    this.success = 'Pracownik dodany poprawnie !'
                    this.error = ''
                    this.email = ''
                    this.password = '',
                    this.name = '',
                    this.surname = '',
                    this.sector_id = '',
                    this.duty_id = ''

                } catch (error) {
                    this.error = error.response.data.error
                    if(error.response.data.error.includes('email')){
                        this.error= "Nazwa e-mail pracownika jest niewłaściwy"
                    }
                    if(error.response.data.error.includes('password')){
                        this.error= "Hasło pracownika jest niewłaściwe, powinno zawierać minimum 8 znaków"
                    }
                    if(error.response.data.error.includes('name')){
                        this.error= "Imię pracownika jest niewłaściwe"
                    }
                    if(error.response.data.error.includes('surname')){
                        this.error= "Nazwisko pracownika jest niewłaściwe"
                    }
                    if(error.response.data.error.includes('sectorId')){
                        this.error= "Wybrano nieprawidłowy sektor pracownika"
                    }
                    if(error.response.data.error.includes('dutyId')){
                        this.error= "Wybrano nieprawidłowy obowiązek pracownika"
                    }
                }
            

        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.redContent {
    color: red;
    font-weight: bold;
}

.greenContent {
    color: green;
    font-weight: bold;
}

.danger-alert {
    color: red;
}

form {
    margin: 5% auto;
    width: 20em;
    text-align: center;
    position: relative;
    border: 9px inset #006666;
    border-radius: 35px;
    padding: 20px;
    background-color: #095a5e;
}

label {
    color: white;
}

legend {
    color: white;
}
</style>
