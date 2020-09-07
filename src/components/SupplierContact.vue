<template>
<div>

    <div class="productsToOrder">

        <div v-for="productToOrder in allProductsToOrder" :key="productToOrder.id">
            <b-card title="Produkt" style="max-width: 40rem;" class="mb-2 ml-2 mt-2 text-center product-card">
                <div class="profilLogo">
                    <font-awesome-icon icon="globe" size="4x" />
                </div>
                <b-card-text class="mt-2">
                    <span class="first"> Nazwa produktu: </span>{{productToOrder.name}}
                </b-card-text>
                <b-card-text>
                    <span class="first">Ilość dostępnych sztuk: </span>{{productToOrder.pieces}}
                </b-card-text>
                <b-card-text>
                    <span class="first">Nazwa dostawcy: </span>{{productToOrder.supplier.name}}
                </b-card-text>
                <b-card-text>
                    <span class="first">E-mail dostawcy: </span>{{productToOrder.supplier.email}}
                </b-card-text>
                <b-card-text>
                    <span class="first">Ostatnia data kontaktu z dostawcą: </span>{{ productToOrder.date_of_contact | moment("LLLL") }}
                </b-card-text>
                <button type="button" class="btn btn-outline-info" @click="sendEmailToSupplier(
            productToOrder.id, 
            productToOrder.supplier.email,
            productToOrder.supplier.name,
            productToOrder.name,
            productToOrder.brand_name,
            )">Wyślij zgłoszenie do dostawcy</button>
            </b-card>
        </div>

        <b-modal hide-backdrop v-model="modalShow" ok-only ok-variant="secondary" ok-title="Zamknij">
            <p>Wiadomość e-mail została wysłana do dostawcy.</p>
        </b-modal>

    </div>
</div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
import {
    mapGetters,
    mapActions,
} from "vuex";
export default {
    name: 'supplierContact',
    data() {
        return {
            modalShow: false
        }
    },
    methods: {
        ...mapActions(["fetchCheckIsEnoughProducts"]),
        async sendEmailToSupplier(orderProductId, orderProductSupplierEmail, orderProductSupplierName, orderProductName, orderProductBrandName, ) {
            const body = {
                "idOfProduct": orderProductId,
                "addressee": orderProductSupplierEmail,
                "subject": orderProductName,
                "text": `Szanowni państwo prosimy o kontakt z przedstawicielem firmy ${orderProductSupplierName}, w sprawie ${orderProductName}, nazwa producenta ${orderProductBrandName} planujemy zakup kolejnych sztuk`
            }

            try {
                await ProductsService.sendEmail(body)
                this.modalShow = true
                this.fetchCheckIsEnoughProducts()
            } catch (error) {
                alert(error)
            }

        }
    },
    computed: {
        ...mapGetters(["allProductsToOrder"])
    },
    created() {
        this.fetchCheckIsEnoughProducts()
    },
}
</script>

<style scoped>
.productsToOrder {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}

.product-card {
    border: 9px inset #006666;
    border-radius: 35px;
    padding: 20px;
    background-color: #095a5e;
    color: white;
}

@media (max-width: 500px) {
    .productsToOrder {
        grid-template-columns: 1fr;
    }
}
</style>
