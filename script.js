$(document).ready(function () {
    /*
     * Main variables
     */
     var content = [{
        title: "Haii Didiinn!!",
        desc: ""
    },
    {
        title: "Bagaimana kabarmuu hari inii?",
        desc: ""
    },
    {
       title: "aku harap kamu masih sempat senyum",
       desc: "meskipun mungkin dunia lagi berat-beratnya"
    },
    {
        title:"kadang masalah datang bareng-bareng, yaaa???",
        desc:"terutama yang paling nyentuh: keluarga… orang tua…"
    },
    {
        title: "rasanya pengen bantu banyak,",
        desc: "tapi keadaan belum ngasih jalan sepenuhnya"
    },
    {
        title: "akuu ngerti rasanyaaa",
        desc: "orang tua masih kerja padahal seharusnya udah bisa istirahat…"
    }, 
    {
        title: "tapi tahu nggaaa???",
        desc: ""
    }, {
        title: "bertahan sejauh ini aja, kamuu udah hebat bangettt",
        desc: ""
    }, {
        title: "kamuu mungkin belum nyadarr",
        desc: "tapi perjuangan kamuu tuh kelihatan dan berartiii"
    }, {
        title: "nggaaa harus langsung bisa segalanyaaa,",
        desc: "cukup terus jalan, satu langkah kecil pun cukupp"
    }, {
        title: "aku percaya kamuu bisa, pelan-pelann",
        desc: "dan aku juga tahu, orang tuamu pasti banggaa"
    }, {
        title: "Sooo,",
        desc: ""
    }, {
        title: "jangan terlalu keras ke diri sendiri, yaaa,",
        desc: ""
    }, {
        title: "kamuu nggaa sendiriannn,",
        desc: ""
    }, {
        title: "kalau capekkk...,",
        desc: "berhenti sebentar itu bukan kalahhh. Itu bagian dari tumbuhhh"
    }, {
        title: "aakkuuu di siniii,",
        desc: ""
    }, {
        title: "semangaatt yaaa <3,",
        desc: ""
    }
 ];
    var currentPage = 0;
    //generate content
    for (var i = 0; i < content.length; i++) {
        //split content letters to array
        for (var obj in content[i]) {
            //if string
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (grouped text)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        //set text to 
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        //clone to data
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }
    //initial arrangement
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Event handlers
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     * Functions
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            //don't scramble currentPage
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            //apply to .title h1s and .desc ps
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    //define random position on screen
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    //defining boundaries
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    //finally, apply all the scrambles
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});