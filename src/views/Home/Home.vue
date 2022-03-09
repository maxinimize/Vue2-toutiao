<template>
  <div class="home-container">
    <van-nav-bar title="标题" fixed />
    <van-pull-refresh
      v-model="isLoading"
      :disabled="finished"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleAPI.js';
import ArticleInfo from '@/components/Article/ArticleInfo.vue';
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      artlist: [],
      loading: true,
      finished: false,
      isLoading: false,
    };
  },
  created() {
    this.initArticlesList();
  },
  methods: {
    async initArticlesList(isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limit);
      console.log(res);
      if (isRefresh) {
        this.artlist = [...res, ...this.artlist];
        this.isLoading = false;
      } else {
        this.artlist = [...this.artlist, ...res];
        this.loading = false;
      }
      if (res.length === 0) {
        this.finished = true;
      }
      console.log(this.loading);
    },
    onLoad() {
      this.page += 1;
      console.log(this.page);
      this.initArticlesList();
    },
    onRefresh() {
      this.page += 1;
      console.log(this.page);
      this.initArticlesList(true);
    },
  },
  components: {
    ArticleInfo,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
  .van-nav-bar {
    background-color: #28b58f;
  }
  /deep/ .van-nav-bar__title {
    color: white;
  }
}
</style>
