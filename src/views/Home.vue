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
        <v-tabs>
            <v-tab>有效出刀记录</v-tab>
            <v-tab>按成员统计</v-tab>
            <v-tab>不参与统计的出刀记录</v-tab>
            <v-tab-item>
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
                        <v-card-title>
                            <v-text-field
                                v-model="search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="challenges"
                            :search="search"
                            multi-sort
                            class="elevation-1"
                            disable-pagination
                            dense
                            hide-default-footer
                        >
                            <template v-slot:[`item.zScore`]="{ item }">
                                <v-chip
                                    :color="getColorByzScore(item.zScore)"
                                    dark
                                    >{{ item.zScore }}</v-chip
                                >
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-data-table
                    :headers="memberStatsHeaders"
                    :items="memberList"
                    :search="memberStatsSearch"
                    multi-sort
                    class="elevation-1"
                    disable-pagination
                    dense
                    hide-default-footer
                >
                    <template v-slot:[`item.zScore`]="{ item }">
                        <v-chip :color="getColorByzScore(item.zScore)" dark>{{
                            item.zScore
                        }}</v-chip>
                    </template>
                    <template v-slot:[`item.avgZScoreBossOne`]="{ item }">
                        <v-chip :color="getColorByzScore(item.avgZScoreBossOne)" dark>{{
                            item.avgZScoreBossOne
                        }}</v-chip>
                    </template>
                    <template v-slot:[`item.avgZScoreBossTwo`]="{ item }">
                        <v-chip :color="getColorByzScore(item.avgZScoreBossTwo)" dark>{{
                            item.avgZScoreBossTwo
                        }}</v-chip>
                    </template>
                    <template v-slot:[`item.avgZScoreBossThree`]="{ item }">
                        <v-chip :color="getColorByzScore(item.avgZScoreBossThree)" dark>{{
                            item.avgZScoreBossThree
                        }}</v-chip>
                    </template>
                    <template v-slot:[`item.avgZScoreBossFour`]="{ item }">
                        <v-chip :color="getColorByzScore(item.avgZScoreBossFour)" dark>{{
                            item.avgZScoreBossFour
                        }}</v-chip>
                    </template>
                    <template v-slot:[`item.avgZScoreBossFive`]="{ item }">
                        <v-chip :color="getColorByzScore(item.avgZScoreBossFive)" dark>{{
                            item.avgZScoreBossFive
                        }}</v-chip>
                    </template>
                    <template v-slot:[`item.avgZScoreTotal`]="{ item }">
                        <v-chip :color="getColorByzScore(item.avgZScoreTotal)" dark>{{
                            item.avgZScoreTotal
                        }}</v-chip>
                    </template>
                </v-data-table>
            </v-tab-item>
            <v-tab-item>
                <v-data-table
                            :headers="headers"
                            :items="invalidChallengesList"
                            :search="search"
                            multi-sort
                            class="elevation-1"
                            disable-pagination
                            dense
                            hide-default-footer
                        >
                            <template v-slot:[`item.zScore`]="{ item }">
                                <v-chip
                                    :color="getColorByzScore(item.zScore)"
                                    dark
                                    v-if="item.zScore"
                                    >{{ item.zScore }}</v-chip
                                >
                            </template>
                        </v-data-table>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dayjs from "dayjs";
import { average, mean, standardDeviation, zScore } from "simple-statistics";
import $ from "jquery";

@Component({
    components: {}
})
export default class Home extends Vue {
    apiURL =
        "http://121.199.35.41:9222/yobot/clan/1051970817/statistics/api/?apikey=ixh4y7XSAcJNhX3F";
    search = "";
    groupStatsMeanDamageByBoss: number[] = [0, 0, 0, 0, 0];
    groupStatsDamageSTDVByBoss: number[] = [0, 0, 0, 0, 0];
    invalidChallengesList: object[] = [];
    memberStatsSearch = "";
    memberStats: object[] = [];
    memberStatsHeaders: object[] = [
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
        {
            text: "有效刀数",
            align: "start",
            sortable: true,
            value: "validChallengeCount"
        },
        {
            text: "刀均偏差值-一王",
            align: "start",
            sortable: true,
            value: "avgZScoreBossOne"
        },
        {
            text: "刀均偏差值-二王",
            align: "start",
            sortable: true,
            value: "avgZScoreBossTwo"
        },
        {
            text: "刀均偏差值-三王",
            align: "start",
            sortable: true,
            value: "avgZScoreBossThree"
        },
        {
            text: "刀均偏差值-四王",
            align: "start",
            sortable: true,
            value: "avgZScoreBossFour"
        },
        {
            text: "刀均偏差值-五王",
            align: "start",
            sortable: true,
            value: "avgZScoreBossFive"
        },
        {
            text: "刀均偏差值-总体",
            align: "start",
            sortable: true,
            value: "avgZScoreTotal"
        }
    ];
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
        { text: "周目", value: "cycle", filterable: false },
        { text: "BOSS序号", value: "boss_num", filterable: false },
        { text: "伤害", value: "damage", filterable: false },
        { text: "剩余HP", value: "health_ramain", filterable: false }, // 原作者拼写错误,
        { text: "偏差值(z-score)", value: "zScore", filterable: false }
        // { text: "", value: "data-table-expand" }
    ];
    challenges: object[] = [];
    memberList: object[] = [];
    groupInfo: object[] = [
        {
            battle_id: 0,
            game_server: "",
            group_id: 0,
            group_name: ""
        }
    ];
    generateValidChallengeCountByQQID(qqid:number) {
        const validChallenges = this.challenges.filter(
            (challenge: any, index) => {
                if (challenge.qqid != qqid) {
                    return false;
                }
                return true;
            }
        )
        console.log("vcl", validChallenges)
        this.memberList.forEach((member: any, index: number, arr:any[]) => {
            if (member.qqid == qqid) {
                member.validChallengeCount = validChallenges.length
            }
        })
    }
    getAvgZScoreByQQIDxBossNum(qqid: number, boss_num: number) {
        const validChallenges = this.challenges.filter(
            (challenge: any, index) => {
                if (challenge.qqid != qqid) {
                    return false;
                }
                if (challenge.boss_num != boss_num && boss_num != 0) {
                    return false;
                }
                return true;
            }
        );
        const zScoreList: number[] = [];
        // console.log("vc", validChallenges);
        if (validChallenges.length == 0) {
            return 0;
        }
        validChallenges.forEach((challenge: any) => {
            zScoreList.push(Number(challenge.zScore));
        });
        // console.log("zcl", zScoreList);
        return average(zScoreList);
    }
    getColorByzScore(zScore: number) {
        if (zScore > 0) {
            return "green";
        }
        if (zScore < 0) {
            return "red";
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
        $.ajax({
            url: this.apiURL,
            type: "get"
        }).then((response: any) => {
            const { members, groupinfo } = response;
            let { challenges } = response;
            const damageList: any[] = [[], [], [], [], []];
            this.memberList = members;
            challenges.forEach((element: any, index: number, arr: any) => {
                if (
                    element.is_continue == true ||
                    element.health_ramain == 0 ||
                    element.cycle == 1
                ) {
                    this.invalidChallengesList.push(element)
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
            challenges.forEach((element: any, index: number, arr: any) => {
                const calculatedzScore = zScore(
                    element.damage,
                    this.groupStatsMeanDamageByBoss[element.boss_num - 1],
                    this.groupStatsDamageSTDVByBoss[element.boss_num - 1]
                );
                element.zScore = calculatedzScore.toFixed(5);
                if (Math.abs(calculatedzScore) > 6) {
                    this.invalidChallengesList.push(element);
                    delete arr[index];
                }
            });
            challenges = challenges.filter(Object);
            this.challenges = challenges;
            this.groupInfo = groupinfo;
            this.invalidChallengesList.reverse()
            this.invalidChallengesList.forEach((element: any) => {
                element.challenge_time = dayjs
                    .unix(element.challenge_time)
                    .format("YYYY-MM-DD HH:mm");
                element.nickname = this.getNicknameByQQID(element.qqid);
            })
            // 生成成员统计数据
            this.memberList.forEach((member: any, index) => {
                this.generateValidChallengeCountByQQID(member.qqid)
                member.avgZScoreBossOne = this.getAvgZScoreByQQIDxBossNum(
                    member.qqid,
                    1
                ).toFixed(5);
                member.avgZScoreBossTwo = this.getAvgZScoreByQQIDxBossNum(
                    member.qqid,
                    2
                ).toFixed(5);
                member.avgZScoreBossThree = this.getAvgZScoreByQQIDxBossNum(
                    member.qqid,
                    3
                ).toFixed(5);
                member.avgZScoreBossFour = this.getAvgZScoreByQQIDxBossNum(
                    member.qqid,
                    4
                ).toFixed(5);
                member.avgZScoreBossFive = this.getAvgZScoreByQQIDxBossNum(
                    member.qqid,
                    5
                ).toFixed(5);
                member.avgZScoreTotal = this.getAvgZScoreByQQIDxBossNum(
                    member.qqid,
                    0
                ).toFixed(5);
            });
        });
    }
}
</script>
