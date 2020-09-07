<template>
<div class="kontener">
    <div class="box">
        <form>
            <fieldset>
                <legend>Formularz produktu</legend>
                <div class="form-group">
                    <label for="name">Nazwa produktu</label>
                    <input v-model="name" type="name" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Podaj nazwę produktu">
                </div>
                <div class="form-group">
                    <label for="pieces">Ilość sztuk</label>
                    <input v-model="pieces" type="number" class="form-control" id="pieces" placeholder="Ilość sztuk">
                </div>
                <div class="form-group">
                    <label for="price">Cena</label>
                    <input v-model="price" type="number" step=0.01 class="form-control" id="price" placeholder="Cena">
                </div>
                <div class="form-group">
                    <label for="price">Kod kreskowy</label>
                    <input v-model="barcode_NO" type="number" class="form-control" id="barcode_NO" placeholder="Kod kreskowy">
                </div>
                <div class="form-group">
                    <label for="brand_name">Nazwa firmy</label>
                    <input v-model="brand_name" type="brand_name" class="form-control" id="brand_name" aria-describedby="brand_nameHelp" placeholder="Podaj nazwę firmy">
                </div>
                <div class="form-group">
                    <label for="exampleSelect1">Wybierz sektor magazynowania produktu</label>
                    <select v-model="sectorId" class="form-control" id="exampleSelect1">
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
                    <label for="exampleSelect2">Wybierz nazwę dostawcy</label>
                    <select v-model="supplierId" class="form-control" id="exampleSelect2">
                        <option>1 - Dostawca Alfa</option>
                        <option>2 - Dostawca Beta</option>
                        <option>3 - Dostawca Gamma</option>
                        <option>4 - Dostawca Delta</option>
                        <option>5 - Dostawca Epsilon</option>
                    </select>
                </div>
                <div>
                    <p class="redContent" v-if="error">{{error}}</p>
                    <p class="greenContent" v-if="success">{{success}}</p>
                </div>
                <button class="btn btn-primary" @click="addProductCall">Dodaj produkt</button>
            </fieldset>
        </form>
    </div>
    <div class="boxCamera">
        <Barcode />
    </div>
</div>
</template>

<script>
const Joi = require('joi');
import Barcode from './Barcode'
import {
    mapActions
} from 'vuex'
export default {
    name: 'AddProduct',
    components: {
        Barcode
    },
    data() {
        return {
            success: '',
            error: '',
            name: '',
            pieces: '',
            price: '',
            barcode_NO: '',
            brand_name: '',
            sectorId: '',
            supplierId: ''
        }
    },
    methods: {
        ...mapActions(["addProduct"]),
        addProductCall() {

            const schema = Joi.object().keys({
                name: Joi.string()
                    .min(1)
                    .max(30)
                    .required(),
                pieces: Joi.number().required(),
                price: Joi.number().required(),
                barcode_NO: Joi.string().min(13).max(13).required(),
                brand_name: Joi.string().min(1).required(),
                sectorId: Joi.number().required(),
                supplierId: Joi.number().required()
            });

            const product = {
                name: this.name,
                pieces: this.pieces,
                price: this.price,
                barcode_NO: this.barcode_NO,
                brand_name: this.brand_name,
                sectorId: this.sectorId,
                supplierId: this.supplierId[0]
            }

            const result = Joi.validate(product, schema);
            const {
                error
            } = result;
            const valid = error == null;

            this.error = ''
            if (!valid) {
                if (result.error.message.includes('name')) {
                    this.error = 'Nazwa produktu jest niewłaściwa'
                }
                if (result.error.message.includes('pieces')) {
                    this.error = 'Ilość produktu jest niewłaściwa'
                }
                if (result.error.message.includes('price')) {
                    this.error = 'Cena produktu jest niewłaściwa'
                }
                if (result.error.message.includes('barcode_NO')) {
                    this.error = 'Kod kreskowy produktu jest niewłaściwy. Musi zawierać 13 cyfr'
                }
                if (result.error.message.includes('brand_name')) {
                    this.error = 'Nazwa firmowa produktu jest niewłaściwy'
                }
                if (result.error.message.includes('sectorId')) {
                    this.error = 'Numer sektora  produktu jest niewłaściwy'
                }
                if (result.error.message.includes('supplierId')) {
                    this.error = 'Numer dostawcy  produktu jest niewłaściwy'
                }

            } else {
                this.addProduct(product)
                this.error = ''
                this.success = 'Produkt dodany poprawnie !'
                this.name = ''
                this.pieces = ''
                this.price = ''
                this.barcode_NO = ''
                this.brand_name = ''
                this.sectorId = ''
                this.supplierId = ''
            }
        }
    },
}
</script>

<style scoped>
.redContent {
    color: red;
    font-weight: bold;
}

.greenContent {
    color: green;
    font-weight: bold;
}

.kontener {
    width: 100%;
    height: auto;
    /*add flexbox style */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-flow: wrap;
}

.box {
    width: 20%;
    height: auto;
    margin: 20px;
    box-sizing: border-box;
    border: 9px inset #006666;
    padding: 10px;
    border-radius: 15px;
}

.boxCamera {
    width: 20%;
    height: 340px;
    box-sizing: border-box;
    margin-top: 250px;
}

label {
    font-weight: 600;
}

@media screen and (max-width: 375px) {
    .boxCamera {
        width: 50%;
    }

    .box {
        width: 80%;
    }

    video {
        width: 100%;
        height: 100%;
    }

    canvas {
        width: 100%;
        height: 100%;
    }

}

@media screen and (max-width: 1000px) {
    .boxStart {
        width: 80%;
    }

    .boxCamera {
        width: 80%;
    }

    .box {
        width: 80%;
    }

    video {
        width: 100%;
        height: 100%;
    }

    canvas {
        width: 100%;
        height: 100%;
    }

}
</style>
