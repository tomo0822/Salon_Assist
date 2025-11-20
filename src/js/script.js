jQuery(function ($) {
  // ページトップボタン
  var topBtn = $(".js-pagetop");
  topBtn.hide();

  // ページトップボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ページトップボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
    return false;
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動。ヘッダーの高さ考慮。)
  $(document).on("click", 'a[href*="#"]', function () {
    let time = 400;
    let header = $("header").innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $("html,body").animate({ scrollTop: targetY }, time, "swing");
    return false;
  });

  // ハンバーガーメニュー
  $(".js-humbarger").on("click", function () {
    $(".p-header__humbarger").toggleClass("is-active");
    $(".p-header__nav").toggleClass("is-active");
    // 現在のbodyタグのoverflowスタイルを確認
    if ($("body").css("overflow") === "hidden") {
      // もしoverflowがhiddenなら、bodyのスタイルを元に戻す
      $("body").css({ height: "", overflow: "" });
    } else {
      // そうでなければ、bodyにheight: 100%とoverflow: hiddenを設定し、スクロールを無効にする
      $("body").css({ height: "100%", overflow: "hidden" });
    }
  });

  $(".js-header-link").on("click", function () {
    $(".p-header__humbarger").removeClass("is-active");
    $(".p-header__nav").removeClass("is-active");
    // bodyタグのスタイルを元に戻す
    $("body").css({ height: "", overflow: "" });
  });

  // アコーディオンメニュー
  $(document).ready(function () {
    $(".js-accordion").on("click", function () {
      $(this).toggleClass("is-open");
      $(this).next(".c-card07__answer").slideToggle();
    });

    // 最初の要素を開いた状態にする
    const $firstAccordion = $(".js-accordion").first();
    $firstAccordion.addClass("is-open");
    $firstAccordion.next(".c-card07__answer").css({
      display: "block", // ← 確実に見せる
      height: "auto", // ← slideToggle対策
    });
  });

  // フェードイン
  $(document).ready(function () {
    $(window).scroll(function () {
      const scroll = $(window).scrollTop(); // スクロール量
      const windowHeight = $(window).height(); // 画面の高さ
      const footerTop = $("footer").offset().top; // フッターの上端位置
      const btnHeight = $(".p-floating").outerHeight(); // ボタンの高さ（被り防止）
      const fadeOutMargin = 50; // 少し手前で消す調整値（任意）

      // ==============================
      // p-floatingボタン
      // ==============================
      if (scroll > 50) {
        // ボタン：フッター手前でフェードアウト
        if (scroll + windowHeight < footerTop - btnHeight - fadeOutMargin) {
          $(".p-floating").addClass("is-active");
          $(".p-floating").css("pointer-events", "auto");
        } else {
          $(".p-floating").removeClass("is-active");
          $(".p-floating").css("pointer-events", "none");
        }
      } else {
        // ページ上部に戻ったらすべて解除
        $(".p-floating").removeClass("is-active");
        $(".p-floating").css("pointer-events", "none");
      }

      // ==============================
      // フェードイン要素
      // ==============================
      $(".js-fadeIn").each(function () {
        const boxHeight = $(this).offset().top;
        if (scroll + windowHeight - windowHeight * 0.05 > boxHeight) {
          $(this).addClass("is-show");
        }
      });
    });

    // 初期状態でも判定
    $(window).scroll();
  });
});
