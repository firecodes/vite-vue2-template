<template>
  <div class="demo-image__preview">
    <a-image style="width: 100px; height: 100px" lazy :src="url" :preview-src-list="previewSrcList"></a-image>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      previewSrcList: this.getData(),
    };
  },
  computed: {},
  created() {},
  methods: {
    getData() {
      const list = [
        {
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          maxSrc: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        },
      ];
      const imgList = [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ];
      const data = Array.from({ length: 100 }).map((_, index) => ({
        key: index,
        src: `image ${index}`,
        maxSrc: imgList[index % imgList.length],
      }));
      return list.concat(data);
    },
  },
};
</script>
