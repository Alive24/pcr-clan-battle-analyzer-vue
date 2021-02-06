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
      <v-tab>偏差值分析 - 按出刀</v-tab>
      <v-tab>偏差值分析 - 按成员</v-tab>
      <v-tab>偏差值分析 - 无效刀</v-tab>
      <v-tab>权重计分分析 - 按成员</v-tab>
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
                <v-chip :color="getColorByzScore(item.zScore)" dark>{{
                  item.zScore
                }}</v-chip>
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
      <v-tab-item>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">类型</th>
                <th class="text-left">一王权重值</th>
                <th class="text-left">二王权重值</th>
                <th class="text-left">三王权重值</th>
                <th class="text-left">四王权重值</th>
                <th class="text-left">五王权重值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>一周目默认倍率</td>
                <td>1.0</td>
                <td>1.0</td>
                <td>1.3</td>
                <td>1.3</td>
                <td>1.5</td>
              </tr>
              <tr>
                <td>一周目修正权重</td>
                <td>
                  <v-text-field
                    v-model="cycleOneCustomizedWeight[0]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="cycleOneCustomizedWeight[1]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="cycleOneCustomizedWeight[2]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="cycleOneCustomizedWeight[3]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="cycleOneCustomizedWeight[4]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
              </tr>
              <tr>
                <td>一周目实际倍率</td>
                <td>{{ (1 * cycleOneCustomizedWeight[0]).toFixed(3) }}</td>
                <td>{{ (1 * cycleOneCustomizedWeight[1]).toFixed(3) }}</td>
                <td>{{ (1.3 * cycleOneCustomizedWeight[2]).toFixed(3) }}</td>
                <td>{{ (1.3 * cycleOneCustomizedWeight[3]).toFixed(3) }}</td>
                <td>{{ (1.5 * cycleOneCustomizedWeight[4]).toFixed(3) }}</td>
              </tr>
              <tr>
                <td>二周目默认倍率</td>
                <td>1.3</td>
                <td>1.3</td>
                <td>1.8</td>
                <td>1.8</td>
                <td>2.0</td>
              </tr>
              <tr>
                <td>二周目修正权重</td>
                <td>
                  <v-text-field
                    v-model="cycleTwoCustomizedWeight[0]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="cycleTwoCustomizedWeight[1]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="cycleTwoCustomizedWeight[2]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="cycleTwoCustomizedWeight[3]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="cycleTwoCustomizedWeight[4]"
                    hide-details
                    single-line
                    type="number"
                    step="0.01"
                  />
                </td>
              </tr>
              <tr>
                <td>二周目实际倍率</td>
                <td>{{ (1.3 * cycleTwoCustomizedWeight[0]).toFixed(3) }}</td>
                <td>{{ (1.3 * cycleTwoCustomizedWeight[1]).toFixed(3) }}</td>
                <td>{{ (1.8 * cycleTwoCustomizedWeight[2]).toFixed(3) }}</td>
                <td>{{ (1.8 * cycleTwoCustomizedWeight[3]).toFixed(3) }}</td>
                <td>{{ (2.0 * cycleTwoCustomizedWeight[4]).toFixed(3) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-data-table
          :headers="scoringStatsHeaders"
          :items="scoringStatsMemberList()"
          :search="scoringStatsSearch"
          multi-sort
          class="elevation-1"
          disable-pagination
          dense
          hide-default-footer
        >
          <template v-slot:[`item.sumScoreBossOneCycleOne`]="{ item }">
            {{ item.sumScoreBossOneCycleOne.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossOneCycleTwo`]="{ item }">
            {{ item.sumScoreBossOneCycleTwo.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossTwoCycleOne`]="{ item }">
            {{ item.sumScoreBossTwoCycleOne.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossTwoCycleTwo`]="{ item }">
            {{ item.sumScoreBossTwoCycleTwo.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossThreeCycleOne`]="{ item }">
            {{ item.sumScoreBossThreeCycleOne.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossThreeCycleTwo`]="{ item }">
            {{ item.sumScoreBossThreeCycleTwo.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossFourCycleOne`]="{ item }">
            {{ item.sumScoreBossFourCycleOne.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossFourCycleTwo`]="{ item }">
            {{ item.sumScoreBossFourCycleTwo.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossFiveCycleOne`]="{ item }">
            {{ item.sumScoreBossFiveCycleOne.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreBossFiveCycleTwo`]="{ item }">
            {{ item.sumScoreBossFiveCycleTwo.toFixed(0) }}
          </template>
          <template v-slot:[`item.sumScoreOverall`]="{ item }">
            {{ item.sumScoreOverall.toFixed(0) }}
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import dayjs from "dayjs"
import {
  average,
  mean,
  standardDeviation,
  zScore,
  sum,
} from "simple-statistics"
import $ from "jquery"
import _ from "lodash"

@Component({
  components: {},
})
export default class Home extends Vue {
  mounted() {
    if (this.apiURL) {
      this.getDataFromAPI()
    }
  }
  scoringStatsMemberList() {
    const computedList: any[] = []
    this.memberList.forEach((member: any) => {
      const newEntry = {
        qqid: 0,
        nickname: "",
        sumScoreBossOneCycleOne: 0,
        sumScoreBossOneCycleTwo: 0,
        sumScoreBossTwoCycleOne: 0,
        sumScoreBossTwoCycleTwo: 0,
        sumScoreBossThreeCycleOne: 0,
        sumScoreBossThreeCycleTwo: 0,
        sumScoreBossFourCycleOne: 0,
        sumScoreBossFourCycleTwo: 0,
        sumScoreBossFiveCycleOne: 0,
        sumScoreBossFiveCycleTwo: 0,
        sumScoreOverall: 0,
      }
      newEntry.qqid = member.qqid
      newEntry.nickname = member.nickname
      newEntry.sumScoreBossOneCycleOne =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 1, 1) *
        1 *
        this.cycleOneCustomizedWeight[0]
      newEntry.sumScoreBossOneCycleTwo =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 1, 2) *
        1.3 *
        this.cycleTwoCustomizedWeight[0]
      newEntry.sumScoreBossTwoCycleOne =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 2, 1) *
        1 *
        this.cycleOneCustomizedWeight[1]
      newEntry.sumScoreBossTwoCycleTwo =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 2, 2) *
        1.3 *
        this.cycleTwoCustomizedWeight[1]
      newEntry.sumScoreBossThreeCycleOne =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 3, 1) *
        1.3 *
        this.cycleOneCustomizedWeight[2]
      newEntry.sumScoreBossThreeCycleTwo =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 3, 2) *
        1.8 *
        this.cycleTwoCustomizedWeight[2]
      newEntry.sumScoreBossFourCycleOne =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 4, 1) *
        1.3 *
        this.cycleOneCustomizedWeight[3]
      newEntry.sumScoreBossFourCycleTwo =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 4, 2) *
        1.8 *
        this.cycleTwoCustomizedWeight[3]
      newEntry.sumScoreBossFiveCycleOne =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 5, 1) *
        1.5 *
        this.cycleOneCustomizedWeight[4]
      newEntry.sumScoreBossFiveCycleTwo =
        this.getDamageByQQIDxBossNumxCycle(member.qqid, 5, 2) *
        2.0 *
        this.cycleTwoCustomizedWeight[4]
      newEntry.sumScoreOverall = sum([
        newEntry.sumScoreBossOneCycleOne,
        newEntry.sumScoreBossOneCycleTwo,
        newEntry.sumScoreBossTwoCycleOne,
        newEntry.sumScoreBossTwoCycleTwo,
        newEntry.sumScoreBossThreeCycleOne,
        newEntry.sumScoreBossThreeCycleTwo,
        newEntry.sumScoreBossFourCycleOne,
        newEntry.sumScoreBossFourCycleTwo,
        newEntry.sumScoreBossFiveCycleOne,
        newEntry.sumScoreBossFiveCycleTwo,
      ])
      computedList.push(newEntry)
    })
    return computedList
  }
  cycleOneCustomizedWeight: number[] = [1.0, 1.0, 1.0, 1.0, 1.0]
  cycleTwoCustomizedWeight: number[] = [1.0, 1.0, 1.0, 1.0, 1.0]
  apiURL = this.$route.query?.apiURL?.toString() || ""
  search = ""
  groupStatsMeanDamageByBoss: number[] = [0, 0, 0, 0, 0]
  groupStatsDamageSTDVByBoss: number[] = [0, 0, 0, 0, 0]
  invalidChallengesList: object[] = []
  memberStatsSearch = ""
  scoringStatsSearch = ""
  memberStats: object[] = []
  memberStatsHeaders: object[] = [
    {
      text: "QQ号",
      align: "start",
      sortable: false,
      value: "qqid",
    },
    {
      text: "昵称",
      align: "start",
      sortable: false,
      value: "nickname",
    },
    {
      text: "有效刀数",
      align: "start",
      sortable: true,
      value: "validChallengeCount",
    },
    {
      text: "刀均偏差值-一王",
      align: "start",
      sortable: true,
      value: "avgZScoreBossOne",
    },
    {
      text: "刀均偏差值-二王",
      align: "start",
      sortable: true,
      value: "avgZScoreBossTwo",
    },
    {
      text: "刀均偏差值-三王",
      align: "start",
      sortable: true,
      value: "avgZScoreBossThree",
    },
    {
      text: "刀均偏差值-四王",
      align: "start",
      sortable: true,
      value: "avgZScoreBossFour",
    },
    {
      text: "刀均偏差值-五王",
      align: "start",
      sortable: true,
      value: "avgZScoreBossFive",
    },
    {
      text: "刀均偏差值-总体",
      align: "start",
      sortable: true,
      value: "avgZScoreTotal",
    },
  ]
  scoringStatsHeaders: object[] = [
    {
      text: "QQ号",
      align: "start",
      sortable: false,
      value: "qqid",
    },
    {
      text: "昵称",
      align: "start",
      sortable: false,
      value: "nickname",
    },
    {
      text: "A1得分",
      value: "sumScoreBossOneCycleOne",
      filterable: false,
    },
    {
      text: "B1得分",
      value: "sumScoreBossOneCycleTwo",
      filterable: false,
    },
    {
      text: "A2得分",
      value: "sumScoreBossTwoCycleOne",
      filterable: false,
    },
    {
      text: "B2得分",
      value: "sumScoreBossTwoCycleTwo",
      filterable: false,
    },
    {
      text: "A3得分",
      value: "sumScoreBossThreeCycleOne",
      filterable: false,
    },
    {
      text: "B3得分",
      value: "sumScoreBossThreeCycleTwo",
      filterable: false,
    },
    {
      text: "A4得分",
      value: "sumScoreBossFourCycleOne",
      filterable: false,
    },
    {
      text: "B4得分",
      value: "sumScoreBossFourCycleTwo",
      filterable: false,
    },
    {
      text: "A5得分",
      value: "sumScoreBossFiveCycleOne",
      filterable: false,
    },
    {
      text: "B5得分",
      value: "sumScoreBossFiveCycleTwo",
      filterable: false,
    },
    {
      text: "总得分",
      value: "sumScoreOverall",
      filterable: false,
    },
  ]
  headers: object[] = [
    { text: "出刀时间", value: "challenge_time" },
    {
      text: "QQ号",
      align: "start",
      sortable: false,
      value: "qqid",
    },
    {
      text: "昵称",
      align: "start",
      sortable: false,
      value: "nickname",
    },
    { text: "周目", value: "cycle", filterable: false },
    { text: "BOSS序号", value: "boss_num", filterable: false },
    { text: "伤害", value: "damage", filterable: false },
    { text: "剩余HP", value: "health_ramain", filterable: false }, // 原作者拼写错误,
    { text: "偏差值(z-score)", value: "zScore", filterable: false },
    // { text: "", value: "data-table-expand" }
  ]
  rawChallenges: object[] = []
  challenges: object[] = []
  memberList: object[] = []
  groupInfo: object[] = [
    {
      battle_id: 0,
      game_server: "",
      group_id: 0,
      group_name: "",
    },
  ]
  generateValidChallengeCountByQQID(qqid: number) {
    const validChallenges = this.challenges.filter((challenge: any, index) => {
      if (challenge.qqid != qqid) {
        return false
      }
      return true
    })
    this.memberList.forEach((member: any, index: number, arr: any[]) => {
      if (member.qqid == qqid) {
        member.validChallengeCount = validChallenges.length
      }
    })
  }
  getDamageByQQIDxBossNumxCycle(qqid: number, boss_num: number, cycle: number) {
    const validChallenges = this.rawChallenges.filter(
      (challenge: any, index) => {
        if (challenge.qqid != qqid) {
          return false
        }
        if (cycle == 1) {
          if (challenge.cycle != 1) {
            return false
          }
        }
        if (cycle != 1) {
          if (challenge.cycle == 1) {
            return false
          }
        }
        if (challenge.boss_num != boss_num) {
          return false
        }
        return true
      },
    )
    const damageList: number[] = []
    validChallenges.forEach((challenge: any) => {
      damageList.push(Number(challenge.damage))
    })
    if (qqid == 106245922) {
      console.log(
        "type",
        boss_num,
        cycle,
        "vcl",
        validChallenges,
        "vcllen",
        validChallenges.length,
        "dml",
        damageList,
        "dmllen",
        damageList.length,
      )
    }
    return sum(damageList)
  }
  getAvgZScoreByQQIDxBossNum(qqid: number, boss_num: number) {
    const validChallenges = this.challenges.filter((challenge: any, index) => {
      if (challenge.qqid != qqid) {
        return false
      }
      if (challenge.boss_num != boss_num && boss_num != 0) {
        return false
      }
      return true
    })
    const zScoreList: number[] = []
    if (validChallenges.length == 0) {
      return 0
    }
    validChallenges.forEach((challenge: any) => {
      zScoreList.push(Number(challenge.zScore))
    })
    return average(zScoreList)
  }
  getColorByzScore(zScore: number) {
    if (zScore > 0) {
      return "green"
    }
    if (zScore < 0) {
      return "red"
    }
  }
  getNicknameByQQID(qqid: string): string {
    let nickname = ""
    this.memberList.forEach((element: any) => {
      if (element.qqid == qqid) {
        nickname = element.nickname
        return nickname
      }
    })
    return nickname
  }
  getDataFromAPI(): void {
    $.ajax({
      url: this.apiURL,
      type: "get",
    }).then((response: any) => {
      const { members, groupinfo } = response
      let { challenges } = response
      this.rawChallenges = _.cloneDeep(challenges)
      const damageList: any[] = [[], [], [], [], []]
      this.memberList = members
      challenges.forEach((element: any, index: number, arr: any) => {
        if (
          element.is_continue == true ||
          element.health_ramain == 0 ||
          element.cycle == 1
        ) {
          this.invalidChallengesList.push(element)
          delete arr[index]
        }
      })
      challenges = challenges.filter(Object).reverse()
      challenges.forEach((element: any) => {
        element.challenge_time = dayjs
          .unix(element.challenge_time)
          .format("YYYY-MM-DD HH:mm")
        element.nickname = this.getNicknameByQQID(element.qqid)
        damageList[element.boss_num - 1].push(element.damage)
      })
      for (let i = 0; i < 5; i++) {
        damageList[i].forEach((element: number, index: number, arr: any) => {
          const damageZscore = zScore(
            element,
            mean(damageList[i]),
            standardDeviation(damageList[i]),
          )
          if (Math.abs(damageZscore) > 6) {
            delete arr[index]
          }
        })
        damageList[i] = damageList[i].filter(Number)
      }
      for (let i = 0; i < 5; i++) {
        this.groupStatsMeanDamageByBoss[i] = Math.round(mean(damageList[i]))
        this.groupStatsDamageSTDVByBoss[i] = Math.round(
          standardDeviation(damageList[i]),
        )
      }
      challenges.forEach((element: any, index: number, arr: any) => {
        const calculatedzScore = zScore(
          element.damage,
          this.groupStatsMeanDamageByBoss[element.boss_num - 1],
          this.groupStatsDamageSTDVByBoss[element.boss_num - 1],
        )
        element.zScore = calculatedzScore.toFixed(5)
        if (Math.abs(calculatedzScore) > 6) {
          this.invalidChallengesList.push(element)
          delete arr[index]
        }
      })
      challenges = challenges.filter(Object)
      this.challenges = challenges
      this.groupInfo = groupinfo
      this.invalidChallengesList.reverse()
      this.invalidChallengesList.forEach((element: any) => {
        element.challenge_time = dayjs
          .unix(element.challenge_time)
          .format("YYYY-MM-DD HH:mm")
        element.nickname = this.getNicknameByQQID(element.qqid)
      })
      // 生成成员各项统计数据
      this.memberList.forEach((member: any, index) => {
        this.generateValidChallengeCountByQQID(member.qqid)
        member.avgZScoreBossOne = this.getAvgZScoreByQQIDxBossNum(
          member.qqid,
          1,
        ).toFixed(5)
        member.avgZScoreBossTwo = this.getAvgZScoreByQQIDxBossNum(
          member.qqid,
          2,
        ).toFixed(5)
        member.avgZScoreBossThree = this.getAvgZScoreByQQIDxBossNum(
          member.qqid,
          3,
        ).toFixed(5)
        member.avgZScoreBossFour = this.getAvgZScoreByQQIDxBossNum(
          member.qqid,
          4,
        ).toFixed(5)
        member.avgZScoreBossFive = this.getAvgZScoreByQQIDxBossNum(
          member.qqid,
          5,
        ).toFixed(5)
        member.avgZScoreTotal = this.getAvgZScoreByQQIDxBossNum(
          member.qqid,
          0,
        ).toFixed(5)
      })
    })
  }
}
</script>
