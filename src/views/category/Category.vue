<template>
  <div>
    <div class="wrapper">
      <ul>
        <button @click="btnclick">++</button>
        <li>派大星1</li>
        <li>派大星2</li>
        <li>派大星3</li>
        <li>派大星4</li>
        <li>派大星5</li>
        <li>派大星6</li>
        <li>派大星7</li>
        <li>派大星8</li>
        <li>派大星9</li>
        <li>派大星10</li>
        <li>派大星11</li>
        <li>派大星12</li>
        <li>派大星13</li>
        <li>派大星14</li>
        <li>派大星15</li>
        <li>派大星16</li>
        <li>派大星17</li>
        <li>派大星18</li>
        <li>派大星19</li>
        <li>派大星20</li>
        <li>派大星21</li>
        <li>派大星22</li>
        <li>派大星23</li>
        <li>派大星24</li>
        <li>派大星25</li>
        <li>派大星26</li>
        <li>派大星27</li>
        <li>派大星28</li>
        <li>派大星29</li>
        <li>派大星30</li>
        <li>派大星31</li>
        <li>派大星32</li>
        <li>派大星33</li>
        <li>派大星34</li>
        <li>派大星35</li>
        <li>派大星36</li>
        <li>派大星37</li>
        <li>派大星38</li>
        <li>派大星39</li>
        <li>派大星40</li>
        <li>派大星41</li>
        <li>派大星42</li>
        <li>派大星43</li>
        <li>派大星44</li>
        <li>派大星45</li>
        <li>派大星46</li>
        <li>派大星47</li>
        <li>派大星48</li>
        <li>派大星49</li>
        <li>派大星50</li>
        <li>派大星51</li>
        <li>派大星52</li>
        <li>派大星53</li>
        <li>派大星54</li>
        <li>派大星55</li>
        <li>派大星56</li>
        <li>派大星57</li>
        <li>派大星58</li>
        <li>派大星59</li>
        <li>派大星60</li>
        <li>派大星61</li>
        <li>派大星62</li>
        <li>派大星63</li>
        <li>派大星64</li>
        <li>派大星65</li>
        <li>派大星66</li>
        <li>派大星67</li>
        <li>派大星68</li>
        <li>派大星69</li>
        <li>派大星70</li>
        <li>派大星71</li>
        <li>派大星72</li>
        <li>派大星73</li>
        <li>派大星74</li>
        <li>派大星75</li>
        <li>派大星76</li>
        <li>派大星77</li>
        <li>派大星78</li>
        <li>派大星79</li>
        <li>派大星80</li>
        <li>派大星81</li>
        <li>派大星82</li>
        <li>派大星83</li>
        <li>派大星84</li>
        <li>派大星85</li>
        <li>派大星86</li>
        <li>派大星87</li>
        <li>派大星88</li>
        <li>派大星89</li>
        <li>派大星90</li>
        <li>派大星91</li>
        <li>派大星92</li>
        <li>派大星93</li>
        <li>派大星94</li>
        <li>派大星95</li>
        <li>派大星96</li>
        <li>派大星97</li>
        <li>派大星98</li>
        <li>派大星99</li>
        <li>派大星100</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  components: {},
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    btnclick() {
      console.log(11);
    },
  },
  computed: {},
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true,
    });

    this.scroll.on("scroll", (position) => {
      //  console.log(position);
    });

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载");
    });
  },
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>