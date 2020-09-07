<template>
<div class="kontener">

    <div class="box">
        <Barcode />
    </div>
    <div class="boxStart">
        <div class="search">
            <b-input-group class="searchInput" size="md" prepend="Wyszkiwanie">
                <b-form-input v-model="search" placeholder="Wpisz dowolną frazę"></b-form-input>
            </b-input-group>
        </div>
    </div>

    <div class="boxTable">
        <div id="table-wrapper" style="overflow-x:auto; overflow-y:auto;">
            <div id="table-scroll" style="overflow-x:auto; overflow-y:auto;">
                <table class="content-table" style="overflow-x:auto; overflow-y:auto;">
                    <thead>
                        <tr>
                            <th scope="col">
                                <font-awesome-icon class="icon" icon="barcode" size="2x" />
                            </th>
                            <th scope="col">Nazwa</th>
                            <th scope="col">Sztuk</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Firma</th>
                            <th @click="
                    sortByIdSector(
                      (sortByIdSectorBoolean = !sortByIdSectorBoolean)
                    )
                  " scope="col">
                                Sektor
                            </th>
                            <th v-if="$store.state.users.user.dutyName == 'Sprzedawca'" scope="col">Dodaj do koszyka</th>
                            <th v-if="$store.state.users.user.dutyName == 'Kierownik'" scope="col">Usuń produkt</th>
                            <th v-if="$store.state.users.user.dutyName == 'Magazynier'" scope="col">Zmień ilość sztuk</th>
                            <th v-if="$store.state.users.user.dutyName == 'Magazynier'" scope="col">Zmień sektor produktu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in filteredList" :key="product.id">
                            <td>{{ product.barcode_NO }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.pieces }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.brand_name }}</td>
                            <td>{{ product.sectorId }}</td>
                            <td v-if="$store.state.users.user.dutyName == 'Sprzedawca'">
                                <button type="button" class="btn btn-warning" @click="addToBasket(product, 1)">
                                    Dodaj
                                </button>
                            </td>
                            <td v-if="$store.state.users.user.dutyName == 'Kierownik'">
                                <b-button class="btn btn-danger" @click="modalShow = !modalShow, sendInfo(product)">Usuń</b-button>
                            </td>
                            <td v-if="$store.state.users.user.dutyName == 'Magazynier'">
                                <b-button class="btn btn-info" @click="modalShowPieces = !modalShowPieces, sendInfo(product)">Edytuj sztuki</b-button>
                            </td>
                            <td v-if="$store.state.users.user.dutyName == 'Magazynier'">
                                <b-button class="btn btn-warning" @click="modalShowProductSector = !modalShowProductSector, sendInfo(product)">Edycja sektora</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <b-modal hide-backdrop v-model="modalShowProductSector" ok-only ok-variant="secondary" ok-title="Zamknij">
        <p>Na jaki sektor chcesz zmienić?</p>
        <select v-model="selectedSector">
            <option disabled value="">Please select one</option>
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
        <button type="button" class="btn btn-warning ml-5" @click="modalShowProductSector = !modalShowProductSector, updateProductSector(selectedProduct.id,selectedSector)">
            Zatwierdź edycję sektora
        </button>
    </b-modal>

    <b-modal hide-backdrop v-model="modalShowPieces" ok-only ok-variant="secondary" ok-title="Zamknij">
        <p>Ile sztuk produktu chcesz dodać?</p>
        <input v-model="numberToAdd" placeholder="Edytuj">
        <button type="button" class="btn btn-warning ml-5" @click="modalShowPieces = !modalShowPieces, addPiecesToProduct(selectedProduct)">
            Zatwierdź edycję sztuk
        </button>
    </b-modal>

    <b-modal hide-backdrop v-model="modalShow" ok-only ok-variant="secondary" ok-title="Zamknij">
        <p>Czy na pewno chcesz usunąć produkt</p>
        <button type="button" class="btn btn-danger mt-1" @click="modalShow = !modalShow, deleteProduct(selectedProduct)">
            Zatwierdź usuwanie
        </button>
    </b-modal>
</div>
</template>

<script>
import Barcode from "./Barcode";
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    name: "Products",
    components: {
        Barcode
    },
    data() {
        return {
            selectedProduct: '',
            modalShow: false,
            modalShowPieces: false,
            modalShowProductSector: false,
            toSell: [],
            sum: 0.0,
            sortByIdSectorBoolean: true,
            sortByBrandNameBoolean: true,
            search: "",
            numberToAdd: 0,
            selectedSector: 1,

        };
    },
    methods: {
        ...mapActions([
            "fetchAllProducts",
            "sortByField",
            "sortByIdSector",
            "sortByBrandName",
            "updateProduct",
            "addNewProductToBasket",
            "setSumOfProductsInBasket",
            "setPiecesOfProductsInBasket",
            "deleteProduct",
            "addPieces",
            "changeProductSector"
        ]),

        sendInfo(product) {
            this.selectedProduct = product;
        },
        addToBasket(product, inBasket) {
            const productInBasket = {
                id: product.id,
                barcode_NO: product.barcode_NO,
                name: product.name,
                pieces: product.pieces,
                price: product.price,
                brand_name: product.brand_name,
                sectorId: product.sectorId,
                inBasket: inBasket
            };

            if (
                this.allProductsInBasket.find(x => x.id === productInBasket.id) ===
                undefined
            ) {
                this.addNewProductToBasket(productInBasket);
            } else {
                this.setPiecesOfProductsInBasket(productInBasket.id);
            }
        },

        addPiecesToProduct(product) {
            const body = {
                ...product,
                howManyToAdd: parseInt(this.numberToAdd)
            }
            this.addPieces(body)
            this.numberToAdd = 0;
        },

        updateProductSector(id, newSectorId) {
            const body = {
                id: id,
                newSectorId: newSectorId
            }
            this.changeProductSector(body);
        }
    },
    computed: {
        ...mapGetters(["allProducts", "allProductsInBasket"]),
        filteredList() {
            return this.allProducts.filter(product => {
                const productToJSON = JSON.stringify(product);
                return productToJSON.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    created() {
        this.fetchAllProducts();
    },
};
</script>

<style scoped>
.kontener {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-flow: wrap;
}

.boxStart {
    width: 20%;
    height: 50px;
    margin-top: 220px;
    margin-right: 0px;
    margin-left: 20px;
}

.boxTable {
    width: 100%;
    height: auto;
    box-sizing: border-box;
}

.box {
    width: 30%;
    height: 240px;
    margin-top: 10px;
    margin-left: 30px;
    box-sizing: border-box;
}

@media screen and (max-width: 1365px) {
    .box {
        width: 50%;
    }

    .boxTable {
        width: 100%;
        margin: 0;
    }

    video {
        width: 100%;
        height: 100%;
    }

    canvas {
        width: 100%;
        height: 100%;
    }

    .boxStart {
        width: 90%;
    }
}

@media screen and (max-width: 375px) {
    .box {
        width: 50%;
    }

    .boxTable {
        width: 100%;
        margin: 0;
    }

    video {
        width: 100%;
        height: 100%;
    }

    canvas {
        width: 100%;
        height: 100%;
    }

    .boxStart {
        width: 30%;
    }
}

@media screen and (max-width: 412px) {
    .boxStart {
        width: 80%;
    }

    .box {
        width: 80%;
    }

    .boxTable {
        width: 100%;
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

table th {
    cursor: pointer;
}

.content-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1em;
    min-width: 100%;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
    background-color: #0077b3;
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
    border-bottom: 0px solid #18bc9c;
}

.content-table tbody tr.active-row {
    font-weight: bold;
    color: #18bc9c;
}
</style>
