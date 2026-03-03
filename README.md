🛠️ BlindCAD
BlindCAD is an experimental 3D parametric modeling tool designed to enable CAD design through code. The core philosophy is to make 3D modeling accessible, precise, and fast by using a text-based approach to generate complex geometries via JavaScript.

This project is a customized fork of CascadeStudio, tailored for a streamlined, local-friendly workflow.

🚀 Key Features
Text-to-Model: Write code, generate solids. No mouse-dragging required—just pure mathematical precision.

OpenCascade Engine: Powered by the professional-grade OpenCascade geometric kernel (via WebAssembly) to handle complex Boolean operations, fillets, and sweeps.

Local Project Management: Integrated .json saving system to ensure your scripts are stored safely on your machine.

Industry-Standard Export: Export your designs as STEP, IGES, or STL files, making them ready for 3D printing or professional CAM software.

💾 Saving & Loading Workflow
Due to the experimental nature of this web version, follow these steps to manage your work:

Saving: Click the "Save Project" button at the bottom of the page. This will download a .json file containing your source code and current slider positions.

Loading: To resume a project, open your .json file with any text editor (like Notepad or VS Code), copy the code string, and paste it back into the BlindCAD editor.

STEP Import: Use the "Import" button to bring in external files. Reference them in your script using the ImportStep("filename.step") command.

🛠️ Quick Start Example
Paste the following code into the editor to generate a basic hexagonal bolt:

JavaScript
// Parameters
let boltHeight = 50;
let boltRadius = 5;

// Geometry
let shaft = Cylinder(boltRadius, boltHeight);
let head = Translate([0, 0, -10], Cylinder(boltRadius * 1.8, 10, {segments: 6}));

// Final Union
Union(shaft, head);

🙏 Credits
Based on CascadeStudio.

