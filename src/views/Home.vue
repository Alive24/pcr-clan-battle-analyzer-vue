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
              {{ groupInfo[0].group_name }}
              <template v-slot:default>
                <thead>
                  <tr>
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
                  <tr v-for="tier in tiers" :key="'stat-' + tier">
                    <template v-for="boss in bosses">
                      <td class="text-left" :key="'mean-' + tier + '-' + boss">
                        {{
                          groupStatsMeanDamageByTierBoss[tier - 1][
                            boss - 1
                          ].toFixed(3)
                        }}
                      </td>
                      <td class="text-left" :key="'svd-' + tier + '-' + boss">
                        {{
                          groupStatsDamageSTDVByTierBoss[tier - 1][
                            boss - 1
                          ].toFixed(3)
                        }}
                      </td>
                    </template>
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
              <template v-for="tier in tiers">
                <tr :key="'default-' + tier">
                  <td>{{ getTierTranslation(tier) }}阶段默认倍率</td>
                  <td
                    v-for="boss in bosses"
                    :key="'default-' + tier + '-' + boss"
                  >
                    {{ tierDefaultWeights[tier - 1][boss - 1] }}
                  </td>
                </tr>
                <tr :key="'weight-' + tier">
                  <td>{{ getTierTranslation(tier) }}阶段自定义倍率</td>
                  <td
                    v-for="boss in bosses"
                    :key="'weight-' + tier + '-' + boss"
                  >
                    <v-text-field
                      v-model="tierCustomizedWeights[tier - 1][boss - 1]"
                      hide-details
                      single-line
                      type="number"
                      step="0.01"
                    />
                  </td>
                </tr>
              </template>
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
          <template
            v-for="bt in tiers.flatMap(t =>
              bosses.map(b => ({ boss: b, tier: t })),
            )"
            v-slot:[`item.SumTier${bt.tier}Boss${bt.boss}`]="{ item }"
          >
            {{ item.sumScore[bt.tier - 1][bt.boss - 1].toFixed(0) }}
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

type MemberScore = number[][]

interface Member {
  qqid: string
  nickname: string
  sumScore: MemberScore
  sumScoreOverall: number
}

function range(from: number, to: number): number[] {
  return [...Array(to).keys()].map(x => x + from)
}

const tierMap: Record<number, number> = Object.assign(
  {},
  ...range(1, 3).map(cycle => ({ [cycle]: 1 })),
  ...range(4, 10).map(cycle => ({ [cycle]: 2 })),
  ...range(11, 34).map(cycle => ({ [cycle]: 3 })),
)

@Component({
  components: {},
})
export default class Home extends Vue {
  mounted() {
    if (this.apiURL) {
      this.getDataFromAPI()
    }
  }

  tiers = range(1, 3) // X 阶段
  bosses = range(1, 5) // X 王

  tierCustomizedWeights: (number | null)[][] = this.tiers.map(() =>
    this.bosses.map(() => null),
  )

  tierDefaultWeights: number[][] = [
    [1.0, 1.0, 1.3, 1.3, 1.5],
    [1.4, 1.4, 1.8, 1.8, 2.0],
    [2.0, 2.0, 2.4, 2.4, 2.6],
    [3.5, 3.5, 3.7, 3.8, 4.0],
  ]

  getBossTranslation(boss: number): string {
    return `${boss}`
  }

  getTierTranslation(tier: number): string {
    return String.fromCharCode("A".charCodeAt(0) + tier - 1)
  }

  getTierByCycle(cycle: number): number {
    return tierMap[cycle] ?? 4
  }

  getWeights(tier: number, boss: number): number {
    return (this.tierCustomizedWeights[tier - 1][boss - 1]
      ? this.tierCustomizedWeights[tier - 1][boss - 1]
      : this.tierDefaultWeights[tier - 1][boss - 1]) as number
  }

  scoringStatsMemberList() {
    const computedList: any[] = []
    this.memberList.forEach((member: Member) => {
      const newEntry: Member = {
        qqid: "0",
        nickname: "",
        sumScore: this.tiers.map(() => this.bosses.map(() => 0)),
        sumScoreOverall: 0,
      }
      newEntry.qqid = member.qqid
      newEntry.nickname = member.nickname

      for (const tier of this.tiers) {
        for (const boss of this.bosses) {
          newEntry.sumScore[tier - 1][boss - 1] =
            this.getDamageByQQIDxBossNumxTier(member.qqid, boss, tier) *
            this.getWeights(tier, boss)
        }
      }

      newEntry.sumScoreOverall = sum(newEntry.sumScore.flatMap(x => x))
      computedList.push(newEntry)
    })
    return computedList
  }

  apiURL = this.$route.query?.apiURL?.toString() || ""
  search = ""
  groupStatsMeanDamageByTierBoss: number[][] = this.tiers.map(() =>
    this.bosses.map(() => 0),
  )
  groupStatsDamageSTDVByTierBoss: number[][] = this.tiers.map(() =>
    this.bosses.map(() => 0),
  )
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
      text: "总得分",
      value: "sumScoreOverall",
      filterable: false,
    },
  ].concat(
    this.tiers.flatMap(t =>
      this.bosses.map(b => ({
        text: `${this.getTierTranslation(t)}${this.getBossTranslation(b)}得分 `,
        value: `SumTier${t}Boss${b}`,
        filterable: false,
      })),
    ),
  )
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
  memberList: Member[] = []
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
  getDamageByQQIDxBossNumxTier(qqid: string, boss_num: number, tier: number) {
    const validChallenges = this.rawChallenges.filter(
      (challenge: any, index) => {
        if (challenge.qqid != qqid) {
          return false
        }
        if (challenge.boss_num != boss_num) {
          return false
        }
        return this.getTierByCycle(challenge.cycle) === tier
      },
    )
    const damageList: number[] = []
    validChallenges.forEach((challenge: any) => {
      damageList.push(Number(challenge.damage))
    })
    return sum(damageList)
  }
  getAvgZScoreByQQIDxBossNum(qqid: string, boss_num: number) {
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
      const damageListTierBoss: number[][][] = this.tiers.map(() =>
        this.bosses.map(() => []),
      )
      this.memberList = members
      challenges.forEach((element: any, index: number, arr: any) => {
        if (element.is_continue == true || element.health_ramain == 0) {
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
        damageListTierBoss[this.getTierByCycle(element.cycle) - 1][
          element.boss_num - 1
        ].push(element.damage)
      })

      for (const tier of this.tiers) {
        for (const boss of this.bosses) {
          damageListTierBoss[tier - 1][boss - 1].forEach(
            (element: number, index: number, arr: number[]) => {
              const damageZscore = zScore(
                element,
                mean(damageListTierBoss[tier - 1][boss - 1]),
                standardDeviation(damageListTierBoss[tier - 1][boss - 1]),
              )
              if (Math.abs(damageZscore) > 6) {
                delete arr[index]
              }
            },
          )
          damageListTierBoss[tier - 1][boss - 1] = damageListTierBoss[tier - 1][
            boss - 1
          ].filter(Number)
        }
      }
      for (const tier of this.tiers) {
        for (const boss of this.bosses) {
          if (damageListTierBoss[tier - 1][boss - 1].length === 0) {
            this.groupStatsMeanDamageByTierBoss[tier - 1][boss - 1] = 0
            this.groupStatsDamageSTDVByTierBoss[tier - 1][boss - 1] = 0
            continue
          }
          this.groupStatsMeanDamageByTierBoss[tier - 1][boss - 1] = mean(
            damageListTierBoss[tier - 1][boss - 1],
          )
          this.groupStatsDamageSTDVByTierBoss[tier - 1][
            boss - 1
          ] = standardDeviation(damageListTierBoss[tier - 1][boss - 1])
        }
      }

      challenges.forEach((element: any, index: number, arr: any) => {
        const calculatedzScore = zScore(
          element.damage,
          this.groupStatsMeanDamageByTierBoss[
            this.getTierByCycle(element.cycle) - 1
          ][element.boss_num - 1],
          this.groupStatsDamageSTDVByTierBoss[
            this.getTierByCycle(element.cycle) - 1
          ][element.boss_num - 1],
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
