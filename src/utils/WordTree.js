function resize() {
  ;(width = vis.node().clientWidth),
  (height = window.innerHeight - 50 - 0),
  heatmap
    .attr('transform', 'translate(' + (width - 20.5) + ',.5)')
    .select('rect.frame')
    .attr('height', height - 1),
  svg.attr('width', width).attr('height', height),
  clip.attr('width', width - 30.5).attr('height', height),
  treeG.call(tree.width(width - 30).height(height - 20)),
  updateHeatmap(),
  text.call(textViewer)
}
function processText(e) {
  let t,
    n = 0,
    r = 0,
    i = 0,
    o = 0,
    a = text.append('span').text('m'),
    c = 285 / a.node().offsetWidth
  a.remove(), (tokens = []), (lines = [])
  for (let i = []; (t = re.exec(e)); ) {
    let l = e.substring(n, t.index)
    ;/\r\n\r\n|\r\r|\n\n/.test(l)
      ? (lines.push(i, []), (i = []), (o = t[0].length))
      : ((o += t[0].length + !!l.length),
      o > c && ((o = t[0].length), lines.push(i), (i = [])))
    let s = {
      token:      t[0],
      lower:      t[0].toLowerCase(),
      index:      r++,
      whitespace: l,
      line:       lines.length
    }
    tokens.push(s), i.push(s), (n = re.lastIndex)
  }
  lines.push(i),
  text.call(textViewer.size(lines.length)),
  tree.tokens(tokens),
  change()
}
function getURL(e, t) {
  function n(e, n) {
    t(
      /^text\/html\b/.test(n.getResponseHeader('Content-Type'))
        ? n.responseText
          .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
          .replace(/<style[^>]*>([\S\s]*?)<\/style>/gim, '')
          .replace(/<head[^>]*>([\S\s]*?)<\/head>/gim, '')
          .replace(/<[^>]*?>/gm, ' ')
          .replace(/&#?\w+;/g, decodeEntity)
        : n.responseText
    )
  }
  if ('https:' === location.protocol && /^http:/.test(e)) proxy(e, n)
  else
    try {
      d3.xhr(e, (t, r) => {
        t ? proxy(e, n) : n(t, r)
      })
    } catch (r) {
      proxy(e, n)
    }
}
function decodeEntity(e) {
  return (entity.innerHTML = e), entity.textContent
}
function proxy(e, t) {
  d3.xhr('//www.jasondavies.com/xhr?url=' + encodeURIComponent(e), t)
}
function url(e, t) {
  let n = [],
    r = {}
  for (let i in state) r[i] = state[i]
  for (let i in e) r[i] = e[i]
  for (let i in r)
    n.push(encodeURIComponent(i) + '=' + encodeURIComponent(r[i]))
  history[t ? 'pushState' : 'replaceState'](null, null, '?' + n.join('&'))
}
function urlParams(e) {
  let t = {}
  return (
    e &&
      e.split(/&/g).forEach(e => {
        ;(e = e.split('=')),
        (t[decodeURIComponent(e[0])] = decodeURIComponent(e[1]))
      }),
    t
  )
}
function change() {
  if (!location.search) return void showHelp()
  let e = state ? state.source : null
  if (
    ((state = urlParams(location.search.substr(1))),
    state.source !== e && state.source)
  )
    source.property('value', state.source),
    getURL(state.source, e => {
      processText(e)
    }),
    hideHelp()
  else if (tokens && tokens.length) {
    let t = state.prefix
    t || url({ prefix: (t = tokens[0].token) }),
    keyword
      .property('value', t)
      .node()
      .select(),
    (t = t.toLowerCase().match(re)),
    treeG.call(
      tree
        .sort(
          'occurrence' === state.sort
            ? (e, t) => {
              return e.index - t.index
            }
            : (e, t) => {
              return t.count - e.count || e.index - t.index
            }
        )
        .reverse(+state.reverse)
        .phraseLine(+state['phrase-line'])
        .prefix(t)
    ),
    refreshText(tree.root()),
    hideHelp()
  }
}
function showHelp() {
  d3.selectAll('#help-window, #form-source').style('display', null),
  d3.selectAll('#form, #reverse-wrapper').style('display', null)
}
function hideHelp() {
  d3.selectAll('#help-window, #form-source').style('display', 'none'),
  d3.selectAll('#form, #reverse-wrapper').style('display', 'inline-block')
}
function currentLine(e) {
  if (!e) return 0
  for (let t = e.children; t && t.length; ) (e = t[0]), (t = e.children)
  return e.tokens[0].line - 3
}
function refreshText(e) {
  clearHighlight()
  for (let t = e, n = 0; t; ) (n += t.tokens.length), (t = t.parent)
  ;(selectedLines = []),
  highlightTokens(e, n),
  updateHeatmap(),
  text.call(textViewer.position(currentLine(e)))
}
function clearHighlight() {
  for (let e = -1; ++e < tokens.length; ) tokens[e].highlight = !1
}
function highlightTokens(e, t) {
  if (e)
    if (e.children && e.children.length)
      (t += e.tokens.length),
      e.children.forEach(e => {
        highlightTokens(e, t)
      })
    else {
      e.tokens.forEach(e => {
        e.highlight = !0
      })
      for (let n = e.tokens[0].index, r = Math.max(0, n - t); n >= r; r++)
        (tokens[r].highlight = !0), selectedLines.push(tokens[r].line)
    }
}
function highlight(e) {
  return e.highlight
}
function updateHeatmap() {
  let e = heatmap.selectAll('line').data(selectedLines),
    t = textViewer.size()
  e
    .enter()
    .insert('line', 'rect')
    .attr('x2', 20),
  e.attr('transform', e => {
    return 'translate(0,' + (height * e) / t + ')'
  }),
  e.exit().remove()
  let n = page.datum()
  ;(n.h = Math.min(
    height,
    Math.max(10, (height * height) / (textViewer.rowHeight() * lines.length))
  )),
  page.attr('height', n.h - 1)
}
function scroll() {
  let e = page.datum()
  page.attr(
    'y',
    (e.y = Math.max(
      0,
      Math.min(
        height - e.h,
        (height * this.scrollTop) / (textViewer.rowHeight() * lines.length)
      )
    ))
  )
}
function drag(e) {
  ;(e.y = Math.max(0, Math.min(height - e.h - 1, d3.event.y))),
  (text.node().scrollTop =
      (e.y * textViewer.rowHeight() * lines.length) / height),
  page.attr('y', e.y)
}
function hoverKey() {
  svg.classed('hover', d3.event.shiftKey)
}
let unicodePunctuationRe =
  '!-#%-*,-/:;?@\\[-\\]_{}\xa1\xa7\xab\xb6\xb7\xbb\xbf\u037e\u0387\u055a-\u055f\u0589\u058a\u05be\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u1400\u166d\u166e\u169b\u169c\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205e\u207d\u207e\u208d\u208e\u2329\u232a\u2768-\u2775\u27c5\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc\u29fd\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00-\u2e2e\u2e30-\u2e3b\u3001-\u3003\u3008-\u3011\u3014-\u301f\u3030\u303d\u30a0\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufd3e\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a\uff1b\uff1f\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65'
!(function() {
  d3.longscroll = function() {
    function e(e) {
      function o(o) {
        e.each(function() {
          this.scrollTop = o
          let e = d3.select(this),
            a = 1 + Math.ceil(this.clientHeight / i),
            c = Math.max(0, Math.min(n - a, r)),
            l = c + a
          e.select('.before').style('height', c * i + 'px'),
          e.select('.after').style('height', (n - l) * i + 'px')
          let s = e
            .select('.current')
            .selectAll('div.row')
            .data(d3.range(c, Math.min(l, n)), String)
          s
            .enter()
            .append('div')
            .attr('class', 'row'),
          s.exit().remove(),
          s.order().call(t)
        })
      }
      e.selectAll('div.before')
        .data([0])
        .enter()
        .append('div')
        .attr('class', 'before')
      let a = e.selectAll('div.current').data([0])
      a
        .enter()
        .append('div')
        .attr('class', 'current'),
      e
        .selectAll('div.after')
        .data([0])
        .enter()
        .append('div')
        .attr('class', 'after'),
      e.on('scroll.longscroll', function() {
        ;(r = Math.floor(this.scrollTop / i)), o(this.scrollTop)
      }),
      o(0),
      e.each(function() {
        let e = d3.select(this)
        e.property(
          'scrollTop',
          +e
            .select('.before')
            .style('height')
            .replace('px', '')
        )
      })
    }
    let t = null,
      n = 0,
      r = 0,
      i = 20
    return (
      (e.render = function(n) {
        return arguments.length ? ((t = n), e) : t
      }),
      (e.rowHeight = function(t) {
        return arguments.length ? ((i = +t), e) : i
      }),
      (e.position = function(t) {
        return arguments.length ? ((r = +t), e) : r
      }),
      (e.size = function(t) {
        return arguments.length ? ((n = +t), e) : n
      }),
      e
    )
  }
})(),
(function(e) {
  function t() {
    function e(a) {
      let s = b ? b.count : 0
      if (s) {
        m(b, k / b.count)
        let h = r(j.nodes(b))
        S.domain(l(b) ? [b.count - 1, b.count + 1] : [0, b.count])
        let u = a.selectAll('text').data(h, c)
        u
          .attr('font-size', t)
          .attr('dy', '.3em')
          .each(function(e) {
            e.length = this.getComputedTextLength()
          }),
        i(h),
        u
          .transition()
          .duration(U)
          .attr('x', e => {
            return d(e.x)
          })
          .attr('y', e => {
            return e.y
          })
        let p = u.enter().append('text'),
          g = u.selectAll('tspan').data(e => {
            let t = e.tokens
            return t.slice(0, 50).map(t => {
              return { data: e, token: t }
            })
          })
        g
          .enter()
          .append('tspan')
          .text((e, t) => {
            return (t && e.token.whitespace ? '\xa0' : '') + e.token.token
          }),
        g.on('click', t => {
          let n,
            r = d3.event
          r.ctrlKey || r.altKey || r.shiftKey
            ? (a.call(e.prefix([t.token.token])),
            (n = t.token.token),
            (t.data = b))
            : ((n = f(t.data)), o(t.data), e(a)),
          E.prefix({ keyword: n, tree: t.data })
        }),
        p
          .attr('font-size', t)
          .attr('dy', '.3em')
          .each(function(e) {
            e.length = this.getComputedTextLength()
          })
          .each(e => {
            let t = e.parent
            e.x = t ? t.x + (t.length || 0) + 50 : 0
          })
          .attr('x', e => {
            return d(e.x)
          })
          .attr('y', e => {
            return e.y
          })
          .attr('visibility', 'hidden'),
        u
          .attr('text-anchor', L ? 'end' : null)
          .transition()
          .delay(U)
          .attr('visibility', null),
        u.exit().remove()
        let v = a.selectAll('path.link').data(j.links(h), e => {
          return c(e.source) + ':' + c(e.target)
        })
        v
          .attr('visibility', null)
          .transition()
          .duration(U)
          .attr('d', I),
        v
          .enter()
          .insert('path', 'a')
          .attr('class', 'link')
          .attr('d', I)
          .attr('visibility', 'hidden')
          .transition()
          .delay(U)
          .attr('visibility', null),
        v.exit().remove(),
        (U = 500),
        n(b)
      }
    }
    function t(e) {
      let t = (e.count / b.count) * k
      return e.children && e.children.length
        ? '0px' | (t > 30 ? 30 + S(e.count - (30 * b.count) / k) : t - 1)
        : Math.max(0, Math.min(15, t - 1))
    }
    function a(e, t, n) {
      let r = w[t.toLowerCase()]
      if (!r) return null
      let i = r.length
      if (!i) return null
      for (
        let a = {},
          c = { tokens: [e[r[0]]], children: [], index: r[0] },
          l = 0;
        i > l;
        l++
      )
        for (
          let s = r[L ? i - l - 1 : l],
            h = Math.min(e.length, s + C),
            d = Math.max(0, s - C),
            f = c,
            g = [t];
          L ? --s > d : ++s < h;

        ) {
          let x = e[s]
          if (v(x)) break
          g.push(x.token.toLowerCase())
          let m = g.join(' '),
            y = a[m]
          y
            ? (f = y)
            : (f.children.push((y = { tokens: [x], children: [], index: s })),
            (a[m] = y),
            (f = y))
        }
      return (
        p(c),
        u(c, C - 1),
        n && n.length && ((n = a[n.join(' ')]), n && o(n.node || n)),
        c
      )
    }
    function u(e, t) {
      if (0 >= t) return void (e.children = [])
      let n = e.count * A
      e.children = e.children.filter(e => {
        return e.count > n ? (u(e, t - 1), !0) : void 0
      })
    }
    function d(e) {
      return L ? y - e : e
    }
    function p(e, t) {
      let n = 0,
        r = e.children.length
      if (r) {
        if (1 === r) {
          let i = e.children[0]
          return (
            (L ? e.tokens.unshift : e.tokens.push).apply(e.tokens, i.tokens),
            (e.children = i.children),
            e.index < 0 && (e.index = i.index),
            (i.node = e),
            p(e, t)
          )
        }
        for (let o = 0; r > o; ++o) n += p(e.children[o], e)
      } else (n = 1), g(e)
      return (e.length = 0), (e.parent = t), (e.count = n)
    }
    function f(e) {
      let t = []
      do
        (L ? t.push : t.unshift).call(
          t,
          d3.merge(
            e.tokens.map(e => {
              return [e.whitespace ? ' ' : '', e.token]
            })
          )
        )
      while ((e = e.parent))
      return (t[0] = t[0].slice(1)), d3.merge(t).join('')
    }
    function g(e) {
      if (L)
        for (
          let t = e.tokens[0].index, n = t - H;
          --t >= 0 && !v(_[t + 1]) && (t >= n || !x(_[t]));

        )
          e.tokens.unshift(_[t])
      else
        for (
          let t = e.tokens[e.tokens.length - 1].index, n = t + H;
          ++t < _.length && !v(_[t]) && (n > t || !x(_[t - 1]));

        )
          e.tokens.push(_[t])
    }
    function v(e) {
      return z && /[\r\n]/.test(e.whitespace)
    }
    function x(e) {
      return /[\.!?]/.test(e.token)
    }
    function m(e, t) {
      e.count * t < 5
        ? e.children &&
            e.children.length > 1 &&
            ((e._collapsed = e.children), (e.children = [e.children[0]]))
        : e._collapsed && !e._children && (e.children = e._collapsed),
      e.children &&
            e.children.forEach(e => {
              m(e, t)
            })
    }
    let y,
      k,
      w,
      b,
      T = 5,
      C = 10,
      H = 15,
      A = 0.01,
      L = !1,
      M = s,
      _ = [],
      R = [],
      z = !1,
      E = d3.dispatch('prefix'),
      S = d3.scale.sqrt().range([0, 25]),
      j = d3.layout
        .partition()
        .sort(h)
        .value(e => {
          return e.count
        }),
      I = d3.svg
        .diagonal()
        .projection(e => {
          return [d(e.y), e.x]
        })
        .source(e => {
          return {
            y: e.source.x + (e.source.length ? e.source.length + T : 0),
            x: e.source.y
          }
        })
        .target(e => {
          return { y: e.target.x - (e.target.length ? T : 0), x: e.target.y }
        }),
      U = 0
    return (
      (e.tokens = function(t) {
        if (!arguments.length) return _
        ;(_ = t), (w = {})
        for (let n, r = 0, i = _.length; i > r; ++r)
          (n = M.call(e, _[r], r)),
          (w.hasOwnProperty(n) ? w[n] : (w[n] = [])).push(r)
        return e
      }),
      (e.prefix = function(t) {
        return arguments.length
          ? ((R = t.slice()),
          (b = a(_, L ? R[R.length - 1] : R[0], L ? R.reverse() : R)),
          e)
          : R
      }),
      (e.root = function() {
        return b
      }),
      (e.reverse = function(t) {
        return arguments.length ? ((L = !!t), e) : L
      }),
      (e.width = function(t) {
        return arguments.length ? (j.size([j.size()[0], (y = +t)]), e) : y
      }),
      (e.height = function(t) {
        return arguments.length ? (j.size([(k = +t), j.size()[1]]), e) : k
      }),
      (e.phraseLine = function(t) {
        return arguments.length ? ((z = !!t), e) : z
      }),
      d3.rebind(d3.rebind(e, E, 'on'), j, 'sort')
    )
  }
  function n(e) {
    e._collapsed && !e._children && (e.children = e._collapsed),
    e.children && e.children.forEach(n)
  }
  function r(e) {
    return (
      e.forEach(e => {
        ;(e.y = e.x + e.dx / 2), (e.x = e.parent ? e.parent.x + 100 : 0)
      }),
      e
    )
  }
  function i(e) {
    return (
      e.forEach(e => {
        let t = e.parent
        e.x = t ? t.x + (t.length || 0) + 50 : 0
      }),
      e
    )
  }
  function o(e) {
    for (a(e); e.parent; )
      e.parent._children ||
          ((e.parent._children = e.parent.children),
          (e.parent.children = [e]),
          (e.parent._count = e.parent.count)),
      (e.parent.count = e.count),
      (e = e.parent)
  }
  function a(e) {
    e._children &&
        ((e.children = e._children),
        delete e._children,
        (e.count = e._count),
        delete e._count),
    e.children && e.children.forEach(a)
  }
  function c(e) {
    let t = []
    do t.unshift(e.index + '-' + e.tokens.length), (e = e.parent)
    while (e)
    return t.join('/')
  }
  function l(e) {
    return (
      !e.children ||
        !e.children.length ||
        (1 === e.children.length && l(e.children[0]))
    )
  }
  function s(e) {
    return e.token.toLowerCase()
  }
  function h(e, t) {
    return t.count - e.count
  }
  e.wordtree = t
})(this)
let width,
  height,
  tree = wordtree().on('prefix', e => {
    text.call(textViewer)
    let t = (state.prefix = e.keyword)
    keyword.property('value', t), url({ prefix: t }), refreshText(e.tree)
  }),
  textViewer = d3.longscroll().render(e => {
    let t = e.selectAll('a').data(e => {
      return lines[e] || []
    })
    t
      .enter()
      .append('a')
      .attr('href', e => {
        return '#' + encodeURIComponent(e.token)
      })
      .on('click', e => {
        d3.event.preventDefault(), url({ prefix: e.token }), change()
      })
      .text(function(e) {
        return (
          e.whitespace &&
            this.parentNode.insertBefore(document.createTextNode(' '), this),
          e.token
        )
      }),
    t.classed('highlight', highlight)
  })
d3.select('#paste-go').on('click', () => {
  url((state = { source: '' }), !0),
  d3.select('#paste-save').property('checked') &&
      d3.text('save').post(d3.select('#paste').property('value'), (e, t) => {
        e
          ? alert(
            'An error occurred when attempting to save your text for sharing!'
          )
          : url({ source: (state.source = t) })
      }),
  processText(d3.select('#paste').property('value'))
})
let div = d3
  .select('#examples')
  .selectAll('div.thumb')
  .data([
    {
      name:   'Obama\u2019s Inauguration Speech',
      source: 'obama.inauguration.2013.txt',
      prefix: 'We'
    },
    {
      name:   'The Cat in the Hat',
      source: 'cat-in-the-hat.txt',
      prefix: 'Thing'
    },
    {
      name:   'Alice in Wonderland',
      source: 'alice-in-wonderland.txt',
      prefix: 'cried'
    },
    {
      name:   'Bob Dylan\u2019s Blowin\u2019 in the Wind',
      source: 'blowin.in.the.wind.txt',
      prefix: 'How'
    },
    {
      name:    'Obama War Speech',
      source:  'obama-war-speech.txt',
      prefix:  'Iraq',
      reverse: 1
    },
    {
      name:    'Steve Jobs Stanford Commencement Speech',
      source:  'steve-jobs-commencement.txt',
      prefix:  'life',
      reverse: 1
    },
    {
      name:          '@jasondavies',
      source:        '@jasondavies',
      prefix:        '@',
      'phrase-line': 1
    },
    {
      name:   'Flickr Comments',
      source: 'flickr-comments.txt',
      prefix: 'Thank you'
    }
  ])
  .each(e => {
    let t = []
    for (let n in e)
      'name' !== n &&
        t.push(encodeURIComponent(n) + '=' + encodeURIComponent(e[n]))
    e.url = './?' + t.join('&')
  })
div
  .append('a')
  .attr('href', e => {
    return e.url
  })
  .each(function() {
    this.appendChild(this.parentNode.firstChild)
  }),
div
  .append('a')
  .attr('href', e => {
    return e.url
  })
  .text(e => {
    return e.name
  }),
d3
  .select('#examples')
  .append('div')
  .attr('class', 'clear')
let re = new RegExp(
    '[' +
      unicodePunctuationRe +
      ']|\\d+|[^\\d' +
      unicodePunctuationRe +
      '0000-001F007F-009F002000A01680180E2000-200A20282029202F205F3000'.replace(
        /\w{4}/g,
        '\\u$&'
      ) +
      ']+',
    'g'
  ),
  vis = d3.select('#vis'),
  svg = vis.append('svg'),
  clip = svg
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect'),
  treeG = svg
    .append('g')
    .attr('transform', 'translate(0,20)')
    .attr('clip-path', 'url(#clip)'),
  heatmap = svg.append('g'),
  lines = [],
  text = d3.select('#text').on('scroll', scroll),
  keyword = d3.select('#keyword'),
  source = d3.select('#source'),
  state = {},
  tokens,
  selectedLines = []
heatmap
  .append('rect')
  .attr('class', 'frame')
  .attr('width', 20)
let page = heatmap
  .append('rect')
  .datum({ y: 0 })
  .attr('class', 'page')
  .attr('width', 20)
  .call(
    d3.behavior
      .drag()
      .origin(Object)
      .on('drag', drag)
  )
d3
  .select(window)
  .on('keydown.hover', hoverKey)
  .on('keyup.hover', hoverKey)
  .on('resize', resize)
  .on('popstate', change),
change(),
resize(),
d3.select('#form').on('submit', () => {
  d3.event.preventDefault(),
  url({ prefix: keyword.property('value') }),
  change()
}),
d3.select('#form-source').on('submit', () => {
  d3.event.preventDefault(),
  url({ source: source.property('value'), prefix: '' }, !0),
  change()
}),
d3
  .select('#sort')
  .selectAll('option')
  .data(['frequency', 'occurrence'])
  .enter()
  .append('option')
  .attr('value', String)
  .text(String),
d3
  .select('#reverse')
  .property('checked', +state.reverse)
  .on('change', function() {
    url({ reverse: this.checked ? 1 : 0 }), change()
  }),
d3
  .select('#phrase-line')
  .property('checked', +state['phrase-line'])
  .on('change', function() {
    url({ 'phrase-line': this.checked ? 1 : 0 }), change()
  }),
d3.select('#sort').on('change', function() {
  url({ sort: this.value }), change()
})
let entity = document.createElement('span')
