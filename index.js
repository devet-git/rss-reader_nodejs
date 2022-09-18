import Parser from "rss-parser";
import express from "express";


const parser = new Parser()
const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => console.log(`See app in: http://localhost:${port}`));

app.get('/', (req, res) => {
	if (req.query.source) {
		let rssUrl = req.query.source
		parser.parseURL(rssUrl, (err, result) => {
			if (err)
				return res.render("home", { error: "Please enter an valid URL" });
			console.dir(result.items);
			res.render("home", { data: result.items });
		})
	} else {
		return res.render("home");
	}
})
app.post('/', async (req, res) => {
	const { rssUrl } = req.body;
	res.redirect('/?source=' + rssUrl);
})
