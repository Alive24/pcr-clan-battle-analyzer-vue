<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="8">
                <template>
                    <v-text-field
                        hint="API地址"
                        append-icon="mdi-cloud-download"
                        @click:append="getDataFromAPI"
                        v-model="apiURL"
                        prepend-icon="mdi-link"
                        persistent-hint
                    />
                </template>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col class="text-center">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>公会名</th>
                                <th>一王平均伤害</th>
                                <th>标准差</th>
                                <th>二王平均伤害</th>
                                <th>标准差</th>
                                <th>三王平均伤害</th>
                                <th>标准差</th>
                                <th>四王平均伤害</th>
                                <th>标准差</th>
                                <th>五王平均伤害</th>
                                <th>标准差</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-left">
                                    {{ groupInfo[0].group_name }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsMeanDamageByBoss[0] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsDamageSTDVByBoss[0] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsMeanDamageByBoss[1] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsDamageSTDVByBoss[1] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsMeanDamageByBoss[2] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsDamageSTDVByBoss[2] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsMeanDamageByBoss[3] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsDamageSTDVByBoss[3] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsMeanDamageByBoss[4] }}
                                </td>
                                <td class="text-left">
                                    {{ groupStatsDamageSTDVByBoss[4] }}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-spacer></v-spacer>
                <v-data-table
                    :headers="headers"
                    :items="challenges"
                    multi-sort
                    class="elevation-1"
                    disable-pagination
                    dense
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                    </template>
                    <template v-slot:[`item.zScore`]="{ item }">
                        <v-chip :color="getColorByzScore(item.zScore)" dark>{{
                            item.zScore
                        }}</v-chip>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dayjs from "dayjs";
import { mean, standardDeviation, zScore } from "simple-statistics";

@Component({
    components: {}
})
export default class Home extends Vue {
    apiURL = ""
    groupStatsMeanDamageByBoss: number[] = [0, 0, 0, 0, 0];
    groupStatsDamageSTDVByBoss: number[] = [0, 0, 0, 0, 0];
    headers: object[] = [
        { text: "出刀时间", value: "challenge_time" },
        {
            text: "QQ号",
            align: "start",
            sortable: false,
            value: "qqid"
        },
        {
            text: "昵称",
            align: "start",
            sortable: false,
            value: "nickname"
        },
        { text: "周目", value: "cycle" },
        { text: "BOSS序号", value: "boss_num" },
        { text: "伤害", value: "damage" },
        { text: "剩余HP", value: "health_ramain" }, // 原作者拼写错误,
        { text: "偏差值(z-score)", value: "zScore" }
        // { text: "", value: "data-table-expand" }
    ];
    challenges: object[] = [];
    memberList: object[] = [];
    groupInfo: object[] = [];
    getColorByzScore(zScore:number) {
        if (zScore > 0) {
            return "green"
        }
        if (zScore < 0) {
            return "red"
        }        
    }
    getNicknameByQQID(qqid: string): string {
        let nickname = "";
        this.memberList.forEach((element: any) => {
            if (element.qqid == qqid) {
                nickname = element.nickname;
                return nickname;
            }
        });
        return nickname;
    }
    getDataFromAPI(): void {
        this.axios.get(this.apiURL).then(response => {
            const { members, groupinfo } = response.data;
            let { challenges } = response.data;
            const damageList: any[] = [[], [], [], [], []];
            this.memberList = members;
            challenges.forEach((element: any, index: number, arr: any) => {
                if (element.is_continue == true || element.health_ramain == 0 || element.cycle == 1) {
                    console.log("to del", index, element);
                    delete arr[index];
                }
            });
            challenges = challenges.filter(Object).reverse();
            challenges.forEach((element: any) => {
                element.challenge_time = dayjs
                    .unix(element.challenge_time)
                    .format("YYYY-MM-DD HH:mm");
                element.nickname = this.getNicknameByQQID(element.qqid);
                damageList[element.boss_num - 1].push(element.damage);
            });
            for (let i = 0; i < 5; i++) {
                damageList[i].forEach(
                    (element: number, index: number, arr: any) => {
                        const damageZscore = zScore(
                            element,
                            mean(damageList[i]),
                            standardDeviation(damageList[i])
                        );
                        if (Math.abs(damageZscore) > 6) {
                            delete arr[index];
                        }
                    }
                );
                damageList[i] = damageList[i].filter(Number);
            }
            for (let i = 0; i < 5; i++) {
                this.groupStatsMeanDamageByBoss[i] = Math.round(
                    mean(damageList[i])
                );
                this.groupStatsDamageSTDVByBoss[i] = Math.round(
                    standardDeviation(damageList[i])
                );
            }
            challenges.forEach((element: any) => {
                const calculatedzScore = zScore(
                    element.damage,
                    this.groupStatsMeanDamageByBoss[element.boss_num - 1],
                    this.groupStatsDamageSTDVByBoss[element.boss_num - 1]
                );
                element.zScore = calculatedzScore.toFixed(5);
                if (Math.abs(calculatedzScore) > 6) {
                    element.zScore += "(无效数据)";
                }
            });
            this.challenges = challenges;
            this.groupInfo = groupinfo;
        });
    }
}
</script>
