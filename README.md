# flagity

Custom binding for [knockoutjs](http://knockoutjs.com/) to switch boolean attibutes of the DOM with flags

# usage

sample [here](http://delmosaurio.github.io/flagity/) or [jsfiddle](http://jsfiddle.net/delmosaurio/PLbyv/)

single flagity

```
<div> data-bind="flagity: { flag: someObsevableFlags, visible: 1 }" </div>
```

flagityWith **binary flags**

```
<!--
    the div elemet is visible when (someFlags() & flag) == flag
-->
<div data-bind="flagityWidth: someFlags">
    <ul data-bind="flagity: { active: 1 }"> 1 </ul>
    <ul data-bind="flagity: { active: 2 }"> 2 </ul>
    <ul data-bind="flagity: { active: 4 }"> 4 </ul>
    <ul data-bind="flagity: { active: 8 }"> 8 </ul>
    <ul data-bind="flagity: { active: 16 }"> 16 </ul>
</div>
```

flagityWith **keys flags** *(binary as default)*

```
<div data-bind="flagityWidth: someKeys, flagityOptions: { type: 'keys' }">
    <ul data-bind="flagity: { active: 'A' }"> A </ul>
    <ul data-bind="flagity: { active: 'B' }"> B </ul>
    <ul data-bind="flagity: { active: 'C' }"> C </ul>
    <ul data-bind="flagity: { active: 'D' }"> D </ul>
    <ul data-bind="flagity: { active: 'E' }"> E </ul>
</div>
```

flagityWith **keys flags** with custom comparer

```
<div data-bind="flagityWidth: someKeys, flagityOptions: { type: 'keys', comparer: function(key, flags) { return Math.round(Math.random()) == 1; } }">
    <ul data-bind="flagity: { active: 'A' }"> A </ul>
    <ul data-bind="flagity: { active: 'B' }"> B </ul>
    <ul data-bind="flagity: { active: 'C' }"> C </ul>
    <ul data-bind="flagity: { active: 'D' }"> D </ul>
    <ul data-bind="flagity: { active: 'E' }"> E </ul>
</div>
```

flagityWith **binary flags** with custom bindings

```
<div data-bind="flagityWidth: someKeys">
    <ul data-bind="flagity: { boolCustomBinding: 1 }"> 1 </ul>
    <ul data-bind="flagity: { boolCustomBinding: 2 }"> 2 </ul>
    <ul data-bind="flagity: { boolCustomBinding: 4 }"> 4 </ul>
    <ul data-bind="flagity: { boolCustomBinding: 8 }"> 8 </ul>
    <ul data-bind="flagity: { boolCustomBinding: 16 }"> 16 </ul>
</div>
```

## license 

(The MIT License)

Copyright (c) 2013 Delmo Carrozzo &lt;dcardev@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
