// Ghost Custom Integration Parameters
const ghostUrl = "CUSTOM_INTEGRATION_API_URL";
const ghostKey = "CUSTOM_INTEGRATION_CONTENT_API_KEY";

const fs = require("fs");
const GhostContentAPI = require("@tryghost/content-api");
var jsonObject = {
  version: "1.0",
  language: "en",
  layout: {
    columns: 7,
    width: 1024,
    margin: 70,
    gutter: 40,
  },
  subtitle: "",
  metadata: {},
  documentStyle: {
    backgroundColor: "#f6f6f6",
  },
  components: [
    {
      role: "title",
      layout: "titleLayout",
      text: "",
      textStyle: "titleStyle",
    },
    {
      role: "header",
      layout: "headerImageLayout",
      style: {
        fill: {
          type: "image",
          url: "",
          fillMode: "cover",
          verticalAlignment: "center",
        },
      },
    },
    {
      role: "author",
      layout: "authorLayout",
      text: "",
      textStyle: "authorStyle",
    },
  ],
  componentTextStyles: {
    "default-title": {
      fontName: "HelveticaNeue-Thin",
      fontSize: 36,
      textColor: "#2F2F2F",
      textAlignment: "center",
      lineHeight: 44,
    },
    "default-subtitle": {
      fontName: "HelveticaNeue-Thin",
      fontSize: 20,
      textColor: "#2F2F2F",
      textAlignment: "center",
      lineHeight: 24,
    },
    titleStyle: {
      textAlignment: "left",
      fontName: "HelveticaNeue-Bold",
      fontSize: 64,
      lineHeight: 74,
      textColor: "#000",
    },
    introStyle: {
      textAlignment: "left",
      fontName: "HelveticaNeue-Medium",
      fontSize: 24,
      textColor: "#000",
    },
    authorStyle: {
      textAlignment: "left",
      fontName: "HelveticaNeue-Bold",
      fontSize: 16,
      textColor: "#000",
    },
    bodyStyle: {
      textAlignment: "left",
      fontName: "Georgia",
      fontSize: 18,
      lineHeight: 26,
      textColor: "#000",
    },
    headingStyle: {
      fontName: "HelveticaNeue-Bold",
      fontSize: 24,
      textColor: "#2F2F2F",
      textAlignment: "left",
      lineHeight: 30,
    },
  },
  componentLayouts: {
    headerImageLayout: {
      columnStart: 0,
      columnSpan: 7,
      ignoreDocumentMargin: true,
      minimumHeight: "40vh",
      margin: {
        top: 15,
        bottom: 15,
      },
    },
    titleLayout: {
      columnStart: 0,
      columnSpan: 7,
      margin: {
        top: 50,
        bottom: 10,
      },
    },
    introLayout: {
      columnStart: 0,
      columnSpan: 7,
      margin: {
        top: 15,
        bottom: 15,
      },
    },
    authorLayout: {
      columnStart: 0,
      columnSpan: 7,
      margin: {
        top: 15,
        bottom: 15,
      },
    },
    bodyLayout: {
      columnStart: 0,
      columnSpan: 5,
      margin: {
        top: 15,
        bottom: 15,
      },
    },
  },
};

createArticles();

function createArticles() {
  const api = new GhostContentAPI({
    url: ghostUrl,
    key: ghostKey,
    version: "v3",
  });
  // fetch 5 posts, including related tags and authors
  api.posts
    .browse({ limit: 5, include: "tags,authors" })
    .then((posts) => {
      var articles = [];
      for (let i = 0; i < posts.length; i++) {
        articles.push(element);
      }

      articles.forEach((post) => {
        writeArticle(post);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

function writeArticle(post) {
  var newJSONObject = jsonObject;
  if (!fs.existsSync(post.title)) {
    fs.mkdirSync("./" + post.title);
  }
  newJSONObject.identifier = post.title;
  newJSONObject.title = post.title;
  newJSONObject.metadata.excerpt = post.title;
  newJSONObject.components[0].text = post.title;
  newJSONObject.metadata.thumbnailURL = post.feature_image;
  newJSONObject.components[1].style.fill.url = post.feature_image;
  newJSONObject.components[2].text = post.created_at.split("T")[0];
  const path = "./" + post.title + "/article.json";
  fs.writeFile(
    path,
    JSON.stringify(newJSONObject).replace(/url/g, "URL"),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      const { execSync } = require("child_process");
      const newtitle = post.title.replace(/ /g, "\\ ");
      const finishedTitle = newtitle.replace(/'/g, "\\'");
      const output = execSync("papi-client article publish " + finishedTitle);
      console.log("Success Uploading!");
    }
  );
}
