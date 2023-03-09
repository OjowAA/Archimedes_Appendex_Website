// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    wd = window.innerWidth,
    ht = window.innerHeight;

// create an engine
var engine = Engine.create(),
    world = engine.world;

// create a renderer
var render = Render.create({
    element: document.getElementById("matterFrame1"),
    engine: engine,
    options: {
      width: wd,
      height: ht,
      background: "#dedede",
      showAngleIndicator: false,
      wireframes: false
    }
});

// create random shapes
var stack = Composites.stack(wd/3.5, 50, 9, 5, 10, 10, function(x, y) {
  var sides = Math.round(Common.random(1, 8));

  // round the edges of some bodies
  var chamfer = null;
  if (sides > 2 && Common.random() > 0.7) {
      chamfer = {
          radius: 10
      };
  }

  switch (Math.round(Common.random(0, 1))) {
  case 0:
      if (Common.random() < 0.8) {
          return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer: chamfer });
      } else {
          return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer: chamfer });
      }
  case 1:
      return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
  }
});
// add stack
Composite.add(world, stack);

// create floor
var ground = Bodies.rectangle(wd/2, ht, wd, 12, { isStatic: true });
// add floor
Composite.add(world, ground);

// // add mouse control
// var mouse = Mouse.create(render.canvas),
//     mouseConstraint = MouseConstraint.create(engine, {
//         mouse: mouse,
//         constraint: {
//             stiffness: 0.2,
//             render: {
//                 visible: true
//             }
//         }
//     });

// Composite.add(world, mouseConstraint);

// Events.on(engine, 'mousemove', function() {
//   Matter.Body.applyForce(body, position, force)
//         if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
//             rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
//             World.add(engine.world, rock);
//             elastic.bodyB = rock;
//         }
//     });

// // keep the mouse in sync with rendering
// render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);