<template>
<div class="kontener">
    <div class="boxTable">
        <div id="table-wrapper" style="overflow-x:auto; overflow-y:auto;">
            <div id="table-scroll" style="overflow-x:auto; overflow-y:auto;">
                <table class="content-table" style="overflow-x:auto; overflow-y:auto;">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="oneSector in allSectors" :key="oneSector.id">
                            <td>{{ oneSector.id }}</td>
                            <td>{{ oneSector.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="boxTable">
        <div id="table-wrapper" style="overflow-x:auto; overflow-y:auto;">
            <div id="table-scroll" style="overflow-x:auto; overflow-y:auto;">
                <table class="content-table" style="overflow-x:auto; overflow-y:auto;">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="oneDuty in allDuties" :key="oneDuty.id">
                            <td>{{ oneDuty.id }}</td>
                            <td>{{ oneDuty.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="boxTable">
        <div id="table-wrapper" style="overflow-x:auto; overflow-y:auto;">
            <div id="table-scroll" style="overflow-x:auto; overflow-y:auto;">
                <table class="content-table" style="overflow-x:auto; overflow-y:auto;">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Imię</th>
                            <th scope="col">Nazwisko</th>
                            <th scope="col">Sektor Id</th>
                            <th scope="col">Obowiązek Id</th>
                            <th scope="col">Edytuj sektor</th>
                            <th scope="col">Edytuj obowiązki</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="oneUser in allUsers" :key="oneUser.id">
                            <td>{{ oneUser.id }}</td>
                            <td>{{ oneUser.name }}</td>
                            <td>{{ oneUser.surname }}</td>
                            <td>{{ oneUser.sectorId }}</td>
                            <td>{{ oneUser.dutyId }}</td>
                            <td>
                                <b-button class="btn btn-warning" @click="(modalShow = !modalShow), sendInfo(oneUser)">Edytuj</b-button>
                            </td>
                            <td>
                                <b-button class="btn btn-warning" @click="(modalShowDuty = !modalShowDuty), sendInfo(oneUser)">Edytuj</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <b-modal hide-backdrop v-model="modalShow">
        <div>
            <b-card title="Zmiana użytkownika">
                <b-card-text>
                    <p></p>
                    <p>Imię: {{ selectedUser.name }}</p>
                    <p>Nazwisko: {{ selectedUser.surname }}</p>
                    <p>Sektor ID: {{ selectedUser.sectorId }}</p>
                    <p>Obowiązek ID: {{ selectedUser.dutyId}}</p>
                </b-card-text>
                <select v-model="sectorSelectedId">
                    <option disabled value="">Wybierz sektor do zmiany</option>
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
                <button type="button" class="btn btn-primary ml-5" @click="(modalShow = !modalShow), updating()">
                    Zatwierdź zmianę
                </button>
            </b-card>
        </div>

    </b-modal>

    <b-modal hide-backdrop v-model="modalShowDuty">
        <div>
            <b-card title="Zmiana użytkownika">
                <b-card-text>
                    <p></p>
                    <p>Imię: {{ selectedUser.name }}</p>
                    <p>Nazwisko: {{ selectedUser.surname }}</p>
                    <p>Sektor ID: {{ selectedUser.sectorId }}</p>
                    <p>Obowiązek ID: {{ selectedUser.dutyId}}</p>
                </b-card-text>
                <select v-model="dutySelectedId">
                    <option disabled value="">Wybierz obowiązek do zmiany</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <button type="button" class="btn btn-primary mt-3" @click="(modalShowDuty = !modalShowDuty), updating2()">
                    Zatwierdź zmianę obowiązku
                </button>
            </b-card>
        </div>
    </b-modal>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
    name: "usersList",
    data() {
        return {
            selectedUser: "",
            modalShow: false,
            modalShowDuty: false,
            sectorSelectedId: "",
            dutySelectedId: ""
        };
    },
    methods: {
        ...mapActions([
            "fetchAllUsers",
            "fetchAllDuties",
            "fetchAllSectors",
            "updateSectorId",
            "updateDutyId"
        ]),
        updating() {
            const body = {
                id: this.selectedUser.id,
                newSectorId: this.sectorSelectedId
            };

            this.updateSectorId(body);
        },

        updating2() {
            const body = {
                id: this.selectedUser.id,
                newDutyId: this.dutySelectedId
            }

            this.updateDutyId(body)
        },

        sendInfo(user) {
            this.selectedUser = user;
        }
    },
    computed: {
        ...mapGetters(["allUsers", "allSectors", "allDuties"])
    },
    created() {
        this.fetchAllUsers();
        this.fetchAllDuties();
        this.fetchAllSectors();
    }
};
</script>

<style>
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
    height: 340px;
    box-sizing: border-box;

}

.box .content-table thead tr {
    background-color: #3e4e59;
}

.box .content-table tbody tr:last-of-type {
    border-bottom: 0px solid #3e4e59;
}

.usersTable {
    width: 100%;
    height: 340px;
    box-sizing: border-box;
    margin: 5px;
}

.boxTable {
    width: 50%;
    height: auto;
    box-sizing: border-box;
    padding: 10px;
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
    background-color: #00aaff;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
}

@media screen and (max-width: 375px) {
    .box {
        width: 50%;
    }

    .usersTable {
        width: 100%;
    }
}
</style>
