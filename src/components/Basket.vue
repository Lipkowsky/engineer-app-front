<template>
<div>
    <div class="basket_logo">
        <font-awesome-icon icon="shopping-basket" size="10x" />
    </div>
    <div id="table-wrapper" style="overflow-x:auto;">
        <div id="table-scroll">
            <table class="content-table">
                <thead>
                    <tr>
                        <th scope="col">Kod kreskowy</th>
                        <th scope="col">Nazwa</th>
                        <th scope="col">Sztuk</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Firma</th>
                        <th scope="col">Sektor</th>
                        <th scope="col">Usuń z koszyka</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="productInBasket in allProductsInBasket" :key="productInBasket.id">
                        <td>{{productInBasket.barcode_NO}}</td>
                        <td>{{productInBasket.name}}</td>
                        <td>{{productInBasket.inBasket}}</td>
                        <td>{{productInBasket.price}}</td>
                        <td>{{productInBasket.brand_name}}</td>
                        <td>{{productInBasket.sectorId}}</td>
                        <td><button @click="deleteProductFromBasket(productInBasket); refreshProducts();" type="button" class="btn btn-danger">Usuń</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="sum">
        Kwota do zapłaty {{this.showSumOfProductsInBasket}} zł
    </div>
    <div class="saleFinishButton">
        <button v-if="showSumOfProductsInBasket != 0"  class="btn btn-outline-info" @click="saleFinish();">Zakończ sprzedaż
            <font-awesome-icon icon="money-bill" /></button>
    </div>
    <b-modal hide-backdrop v-model="modalShow" ok-only ok-variant="secondary" ok-title="Zamknij">
        <p>Zakończenie zakupów</p>
    </b-modal>
</div>
</template>

<script>
import jspdf from 'jspdf'
import 'jspdf-autotable'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'Basket',
    data() {
        return {
            modalShow: false,
        }
    },
    methods: {
        ...mapActions(['updateProduct', 'deleteProductFromBasket', 'fetchAllProducts', 'setSumOfProductsInBasket', 'deleteAllProdcutsFromBasket']),
        saleFinish() {
            this.allProductsInBasket.forEach(element => {
                this.updateProduct(element);
            });
            this.exportSaleDocument();
            this.fetchAllProducts();
            this.deleteAllProdcutsFromBasket();
            this.modalShow = true;

        },
        refreshProducts() {
            this.fetchAllProducts();
            this.setSumOfProductsInBasket();
        },
        exportSaleDocument() {

            var columns = [{
                    title: "Kod kreskowy",
                    dataKey: "barcode_NO"
                },
                {
                    title: "Nazwa",
                    dataKey: "name"
                },
                {
                    title: "Sztuk",
                    dataKey: "inBasket"
                },
                {
                    title: "Cena",
                    dataKey: "price"
                },
                {
                    title: "Producent",
                    dataKey: "brand_name"
                }
            ]
            var doc = new jspdf('p', 'pt');
            doc.autoTable(columns, this.allProductsInBasket, )

            let y = doc.lastAutoTable.finalY;
            const finalString = "Koszt - podsumowanie : " + this.showSumOfProductsInBasket + " zlotych"
;
            doc.text(300, y + 30, finalString)

            doc.save('table.pdf')
        }
    },
    computed: mapGetters(['allProductsInBasket', 'showSumOfProductsInBasket', ]),
    created() {
        this.setSumOfProductsInBasket();
    },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');

.sum {
    text-align: center;
    font-size: 180%;
    padding: 100px 10px;
}

.saleFinishButton .btn {
    width: 100%;
    font-size: 140%;
}

.basket_logo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-flow: wrap;
}

.content-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1.0em;
    min-width: 100%;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
    background-color: #18bc9c;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
}

.content-table th,
.content-table td {
    padding: 12px 15px;
}

.content-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
    border-bottom: 2px solid #18bc9c;
}

.content-table tbody tr.active-row {
    font-weight: bold;
    color: #18bc9c;
}
</style>
