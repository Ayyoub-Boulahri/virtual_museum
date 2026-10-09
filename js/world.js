import { PRIMS } from './prims.js';
import { Simu } from './simu.js';

import { ENTITIES } from './entities/entities.js';
import { COMPS } from './components/components.js';
//import {WORLD_DATA} from './sceneData.js';

import { OEUVRES, SALLES, infoOeuvre } from "./oeuvres.js";
import { Guide } from "./guide.js";

// Orientation d'un tableau : direction vers laquelle il regarde
const VERS_PZ = 0;             // regarde vers +z
const VERS_MZ = Math.PI;       // regarde vers -z
const VERS_PX = Math.PI / 2;   // regarde vers +x
const VERS_MX = -Math.PI / 2;  // regarde vers -x

const ACCROCHAGE = [
  // ---- Salle I (ouest, z de 5 à 15) : Paris, capitale des arts
  { id: "modigliani_hebuterne", x: -13.3, y: 2.3, z: 5.18, rot: VERS_PZ, h: 1.7 },
  { id: "soutine_groom", x: -12.5, y: 2.3, z: 14.87, rot: VERS_MZ, h: 1.6 },
  { id: "valadon_chambre_bleue", x: -8.3, y: 2.3, z: 14.87, rot: VERS_MZ, h: 1.45 },
  { id: "bonnard_petit_poucet", x: -3.9, y: 2.3, z: 14.87, rot: VERS_MZ, h: 1.45 },
  { id: "gris_arlequin", x: -14.87, y: 2.3, z: 7.9, rot: VERS_PX, h: 1.7 },
  { id: "delaunay_tour_eiffel", x: -14.87, y: 2.3, z: 12.1, rot: VERS_PX, h: 1.9 },
  { id: "modigliani_lunia", x: -0.18, y: 2.3, z: 6.5, rot: VERS_MX, h: 1.6 },
  { id: "vallotton_chale_rouge", x: -0.18, y: 2.3, z: 13.5, rot: VERS_MX, h: 1.45 },

  // ---- Salle II (centrale, z de -5 à 5) : l'abstraction
  { id: "klee_senecio", x: -13.3, y: 2.3, z: 4.82, rot: VERS_MZ, h: 1.3 },
  { id: "kandinsky_gelb_rot_blau", x: -6.8, y: 2.3, z: 4.82, rot: VERS_MZ, h: 1.55 },
  { id: "kandinsky_several_circles", x: -2.8, y: 2.3, z: 4.82, rot: VERS_MZ, h: 1.5 },
  { id: "mondrian_tableau_i", x: -13.3, y: 2.3, z: -4.82, rot: VERS_PZ, h: 1.3 },
  { id: "klee_burg_sonne", x: -6.8, y: 2.3, z: -4.82, rot: VERS_PZ, h: 1.6 },
  { id: "mondrian_composition_ii", x: -2.8, y: 2.3, z: -4.82, rot: VERS_PZ, h: 1.5 },
  { id: "lissitzky_proun", x: -14.87, y: 2.3, z: -2.3, rot: VERS_PX, h: 1.45 },
  { id: "malevich_paysan", x: -14.87, y: 2.3, z: 2.3, rot: VERS_PX, h: 1.75 },
  { id: "doesburg_counter_v", x: -0.18, y: 2.3, z: -3.5, rot: VERS_MX, h: 1.2 },
  { id: "kandinsky_on_white", x: -0.18, y: 2.3, z: 3.5, rot: VERS_MX, h: 1.25 },

  // ---- Salle III (est, z de -15 à -5) : l'Amérique du Jazz Age
  { id: "davis_lucky_strike", x: -13.3, y: 2.3, z: -5.18, rot: VERS_MZ, h: 1.75 },
  { id: "hopper_automat", x: -6.8, y: 2.3, z: -5.18, rot: VERS_MZ, h: 1.5 },
  { id: "hopper_railroad", x: -2.8, y: 2.3, z: -5.18, rot: VERS_MZ, h: 1.45 },
  { id: "wood_american_gothic", x: -12.4, y: 2.3, z: -14.87, rot: VERS_PZ, h: 1.75 },
  { id: "motley_blues", x: -8.0, y: 2.3, z: -14.87, rot: VERS_PZ, h: 1.5 },
  { id: "demuth_figure_5", x: -3.6, y: 2.3, z: -14.87, rot: VERS_PZ, h: 1.7 },
  { id: "okeeffe_black_iris", x: -14.87, y: 2.3, z: -12.1, rot: VERS_PX, h: 1.6 },
  { id: "jazz_singer_affiche", x: -14.87, y: 2.3, z: -7.9, rot: VERS_PX, h: 1.6 },
  { id: "louise_brooks", x: -0.18, y: 2.3, z: -6.5, rot: VERS_MX, h: 1.1 },
  { id: "prohibition", x: -0.18, y: 2.3, z: -13.5, rot: VERS_MX, h: 0.95 },

  // ---- Mezzanine (plancher à y = 5) : photographies
  { id: "lindbergh", x: -14.87, y: 7.0, z: -10.5, rot: VERS_PX, h: 1.3 },
  { id: "expo_1925", x: -14.87, y: 7.0, z: -3.6, rot: VERS_PX, h: 1.35 },
  { id: "expo_1925_porte", x: -14.87, y: 7.0, z: 3.6, rot: VERS_PX, h: 1.2 },
  { id: "bauhaus_maitres", x: -14.87, y: 7.0, z: 10.5, rot: VERS_PX, h: 1.75 },
  { id: "josephine_baker", x: -11, y: 7.0, z: 14.87, rot: VERS_MZ, h: 1.65 },
  { id: "original_charleston", x: -5, y: 7.0, z: 14.87, rot: VERS_MZ, h: 1.6 },
  { id: "baker_charleston", x: -11, y: 7.0, z: -14.87, rot: VERS_PZ, h: 1.65 },
  { id: "lenglen", x: -5, y: 7.0, z: -14.87, rot: VERS_PZ, h: 1.3 },

  // ---- Hall : grands formats
  { id: "monet_nympheas", x: 7.5, y: 3.0, z: -14.87, rot: VERS_PZ, h: 1.9 },
  { id: "bellows_dempsey_firpo", x: 13.0, y: 2.9, z: -14.87, rot: VERS_PZ, h: 1.75 },
  { id: "kandinsky_composition_viii", x: 11.2, y: 3.0, z: 14.87, rot: VERS_MZ, h: 2.1 },
  { id: "stella_brooklyn_bridge", x: 3.2, y: 6.6, z: 14.87, rot: VERS_MZ, h: 2.3 },
];

function texturePlatre(nom, couleur, scene) {
  const T = 512;
  const tex = new BABYLON.DynamicTexture(nom, { width: T, height: T }, scene, true);
  const ctx = tex.getContext();
  ctx.fillStyle = couleur;
  ctx.fillRect(0, 0, T, T);
  for (let i = 0; i < 160; i++) {
    const x = Math.random() * T, y = Math.random() * T, r = 20 + Math.random() * 80;
    const c = Math.random() < 0.5 ? "255,255,255" : "110,90,70";
    for (const dx of [-T, 0, T]) {
      for (const dy of [-T, 0, T]) {
        const g = ctx.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, r);
        g.addColorStop(0, `rgba(${c},0.05)`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x + dx - r, y + dy - r, 2 * r, 2 * r);
      }
    }
  }
  const img = ctx.getImageData(0, 0, T, T);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 9;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  tex.update();
  tex.wrapU = tex.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
  return tex;
}


class World extends Simu {

    constructor() {
        super();
    }

    createWorld(data) {
        const scene = this.scene;


        this.createAssets();
        this.createDecor();

        
        // const ciel = this.createEntity("ciel", ENTITIES.entity, {})
        //     .add(COMPS.sky, {})
        //     ;
        
        // const sol = this.createEntity("sol", ENTITIES.entity, {})
        //     .add(COMPS.ground, { material: "marbre_blanc" })
        //     ;
        
        // const dali = this.createEntity("dali", ENTITIES.kine, {})
        //     .add(COMPS.model, {
        //         file: "./assets1/glb_load/dali.glb",
        //         scale: 0.005,
        //         color: [0.72, 0.62, 0.25]
        //     })
        //     .add(COMPS.position, { x: 5, y: 2.8, z: 0.14 })
        //     .add(COMPS.lookAtForward, {})
        //     .add(COMPS.brownianMotion, {})
        //     ;
            

        const pendule = this.createEntity("pendule", ENTITIES.pendule, { y: 4.5, x: 20 });        
        // Hall, against the wall between the doors of Salle I and Salle II,
        // facing +x (the hall); its back (0.4 deep) touches the wall at x = 0.1
        const horloge = this.createEntity("horloge", ENTITIES.horloge, { x: 0.5, y: 0, z: 5, rotY: -Math.PI / 2 });


        // =========================
        // 4) Objets procéduraux conservés depuis ton world.js
        // =========================
        // const offsetY = 5.1;

        // const sphere = PRIMS.sphere("sph1", {}, scene);
        // const sph = PRIMS.sphere("sph2", {}, scene);
        // sph.position.y = 0.5;
        // PRIMS.creuser(sphere, sph);

        // const sphere_b = PRIMS.sphere("sph1_b", {}, scene);
        // sphere_b.position.y = offsetY;

        // const sph_b = PRIMS.sphere("sph2_b", {}, scene);
        // sph_b.position.y = 0.5 + offsetY;
        // PRIMS.creuser(sphere_b, sph_b);

    }

    createAssets() {


    }

    createDecor() {

        const scene = this.scene;

        scene.clearColor = new BABYLON.Color4(0.07, 0.075, 0.085, 1);
        scene.collisionsEnabled = true;
        scene.gravity = new BABYLON.Vector3(0, -0.15, 0);
        scene.requireLightSorting = true;

        const ip = scene.imageProcessingConfiguration;
        ip.toneMappingEnabled = true;
        ip.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
        ip.exposure = 1.1;
        ip.contrast = 1.1;
        ip.vignetteEnabled = true;
        ip.vignetteWeight = 1.6;
        ip.vignetteColor = new BABYLON.Color4(0.05, 0.03, 0.02, 0);

        scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
            "https://assets.babylonjs.com/environments/environmentSpecular.env",
            scene,
        );
        scene.environmentIntensity = 0.6;

        const envReflet = BABYLON.CubeTexture.CreateFromPrefilteredData(
            "https://assets.babylonjs.com/environments/environmentSpecular.env",
            scene,
        );
        envReflet.level = 0.15;

        const ambientLight = new BABYLON.HemisphericLight(
            "ambientLight",
            new BABYLON.Vector3(0, 1, 0),
            scene,
        );
        ambientLight.intensity = 0.5;
        ambientLight.diffuse = new BABYLON.Color3(1.0, 0.95, 0.88);
        ambientLight.groundColor = new BABYLON.Color3(0.2, 0.17, 0.14);
        ambientLight.specular = BABYLON.Color3.Black();
        ambientLight.renderPriority = 1;

        const mainLight = new BABYLON.PointLight(
            "museumLight",
            new BABYLON.Vector3(7, 7.6, 0),
            scene,
        );
        mainLight.intensity = 0.85;
        mainLight.range = 24;
        mainLight.diffuse = new BABYLON.Color3(1.0, 0.85, 0.7);
        mainLight.specular = new BABYLON.Color3(0.3, 0.25, 0.2);

        const fillLight = new BABYLON.PointLight(
            "fillLight",
            new BABYLON.Vector3(7.5, 7.6, 8),
            scene,
        );
        fillLight.intensity = 0.45;
        fillLight.range = 16;
        fillLight.diffuse = new BABYLON.Color3(1.0, 0.86, 0.7);
        fillLight.specular = BABYLON.Color3.Black();

        const fillLight2 = new BABYLON.PointLight(
            "fillLight2",
            new BABYLON.Vector3(7.5, 7.6, -8),
            scene,
        );
        fillLight2.intensity = 0.45;
        fillLight2.range = 16;
        fillLight2.diffuse = new BABYLON.Color3(1.0, 0.82, 0.62);
        fillLight2.specular = BABYLON.Color3.Black();

        // une lumière par salle, sous le plafond (y = 5)
        const sallesLumieres = [
            { nom: "salleOuestLight", z: 10 },
            { nom: "stageLight", z: 0 },
            { nom: "salleEstLight", z: -10 },
        ];
        sallesLumieres.forEach((s) => {
            const l = new BABYLON.PointLight(s.nom, new BABYLON.Vector3(-7.5, 4.5, s.z), scene);
            l.intensity = 0.55;
            l.range = 10;
            l.diffuse = new BABYLON.Color3(1.0, 0.88, 0.75);
            l.specular = new BABYLON.Color3(0.12, 0.1, 0.08);
        });

        // mezzanine
        [-7, 7].forEach((z, i) => {
            const l = new BABYLON.PointLight("mezzLight" + i, new BABYLON.Vector3(-7.5, 8.6, z), scene);
            l.intensity = 0.6;
            l.range = 10;
            l.diffuse = new BABYLON.Color3(1.0, 0.86, 0.7);
            l.specular = BABYLON.Color3.Black();
        });

        const materiau1 = new BABYLON.StandardMaterial("mat_wall", scene);
        materiau1.diffuseTexture = texturePlatre("tex_platre_mur", "#e6dccb", scene);
        materiau1.diffuseTexture.uScale = 3;
        materiau1.diffuseTexture.vScale = 2;
        materiau1.specularColor = new BABYLON.Color3(0.04, 0.04, 0.04);

        const matPlafond = new BABYLON.StandardMaterial("mat_plafond", scene);
        matPlafond.diffuseTexture = texturePlatre("tex_platre_plafond", "#f1ebe0", scene);
        matPlafond.diffuseTexture.uScale = 4;
        matPlafond.diffuseTexture.vScale = 4;
        matPlafond.specularColor = BABYLON.Color3.Black();
        // éclairage indirect du plafond (les lampes l'atteignent en lumière rasante)
        matPlafond.emissiveColor = new BABYLON.Color3(0.17, 0.155, 0.135);

        const materiau2 = PRIMS.standardMaterial(
            "mat_sol",
            {
                texture: "./assets/marble.jpg",
                uScale: 12,
                vScale: 12,
            },
            scene,
        );
        materiau2.specularColor = new BABYLON.Color3(0.35, 0.35, 0.35);
        materiau2.specularPower = 96;

        materiau2.reflectionTexture = envReflet;

        const matParquet = PRIMS.standardMaterial(
            "mat_parquet",
            {
                texture: "./assets/240.jpg",
                uScale: 4,
                vScale: 8,
            },
            scene,
        );
        matParquet.diffuseColor = new BABYLON.Color3(0.85, 0.72, 0.58);
        matParquet.specularColor = new BABYLON.Color3(0.12, 0.1, 0.08);

        const matBois = PRIMS.standardMaterial(
            "mat_bois",
            {
                texture: "./assets/wood.jpg",
                uScale: 3,
                vScale: 3,
            },
            scene,
        );
        matBois.specularColor = new BABYLON.Color3(0.15, 0.12, 0.1);
        matBois.specularPower = 48;

        const matVerreNoir = new BABYLON.StandardMaterial("mat_verre_noir", scene);
        matVerreNoir.diffuseColor = new BABYLON.Color3(0, 0, 0);
        matVerreNoir.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
        matVerreNoir.specularPower = 128;
        matVerreNoir.reflectionTexture = envReflet;
        matVerreNoir.alpha = 0.5;
        matVerreNoir.backFaceCulling = false;

        const matVerre = new BABYLON.PBRMaterial("mat_verre", scene);
        matVerre.albedoColor = new BABYLON.Color3(0.75, 0.9, 0.9);
        matVerre.alpha = 0.16;
        matVerre.metallic = 0;
        matVerre.roughness = 0.05;
        matVerre.backFaceCulling = false;
        matVerre.usePhysicalLightFalloff = false;

        const matOr = new BABYLON.PBRMaterial("mat_or", scene);
        matOr.albedoColor = new BABYLON.Color3(0.8, 0.58, 0.24);
        matOr.metallic = 0.95;
        matOr.roughness = 0.3;
        matOr.usePhysicalLightFalloff = false;

        const matNoir = new BABYLON.PBRMaterial("mat_noir", scene);
        matNoir.albedoColor = new BABYLON.Color3(0.045, 0.04, 0.035);
        matNoir.metallic = 0.35;
        matNoir.roughness = 0.25;
        matNoir.usePhysicalLightFalloff = false;

        const ciel = PRIMS.sky("ciel", {}, scene);

        const sol = PRIMS.ground(
            "sol",
            {
                materiau: materiau2,
            },
            scene,
        );

        const room = new BABYLON.TransformNode("room", scene);


        const estWall = PRIMS.wall(
            "estWall",
            {
                largeur: 30,
                hauteur: 10,
                epaisseur: 0.1,
                materiau: materiau1,
            },
            scene,
        );
        estWall.parent = room;
        estWall.position.z = -15;

        const ouestWall = PRIMS.wall(
            "ouestWall",
            {
                largeur: 30,
                hauteur: 10,
                epaisseur: 0.1,
                materiau: materiau1,
            },
            scene,
        );
        ouestWall.parent = room;
        ouestWall.position.z = 15;

        const backWall = PRIMS.wall(
            "backWall",
            {
                largeur: 30,
                hauteur: 10,
                epaisseur: 0.1,
                materiau: materiau1,
            },
            scene,
        );
        backWall.parent = room;
        backWall.position.x = -15;
        backWall.rotation.y = Math.PI / 2;

        const roof = PRIMS.roof(
            "roof",
            {
                largeur: 30,
                profondeur: 30,
                epaisseur: 0.1,
                materiau: matPlafond,
            },
            scene,
        );
        roof.parent = room;
        roof.position.y = 10;

        const pieceLeftWall = PRIMS.wallHole(
            "pieceLeftWall",
            {
                cloison: {
                    largeur: 15,
                    hauteur: 5,
                    epaisseur: 0.2,
                    materiau: materiau1,
                },
                trou: {
                    largeur: 2,
                    hauteur: 4,
                    epaisseur: 1,
                    position: new BABYLON.Vector3(-3, -3.5, 0),
                },
            },
            scene,
        );
        pieceLeftWall.parent = room;
        pieceLeftWall.position.x = -7.5;
        pieceLeftWall.position.z = 5;

        const monalisaPoster = PRIMS.poster("monalisa", { tableau: "./assets/posters/Mona_Lisa.jpg", largeur: 1, hauteur: 1.5, spot: true, halo: true, info: infoOeuvre("monalisa") }, scene)
        monalisaPoster.parent = pieceLeftWall
        monalisaPoster.position.set(5, 2.5, 0.2)

        const lastDinner = PRIMS.poster("lastDinner", { tableau: "./assets/posters/last_dinner.jpg", largeur: 3, hauteur: 1.5, spot: true, halo: true, info: infoOeuvre("lastDinner") }, scene)
        lastDinner.parent = pieceLeftWall
        lastDinner.position.set(1.5, 2.5, 0.2)

        const pieceRightWall = PRIMS.wallHole(
            "pieceRightWall",
            {
                cloison: {
                    largeur: 15,
                    hauteur: 5,
                    epaisseur: 0.2,
                    materiau: materiau1,
                },
                trou: {
                    largeur: 2,
                    hauteur: 4,
                    epaisseur: 1,
                    position: new BABYLON.Vector3(-3, -3.5, 0),
                },
            },
            scene,
        );
        pieceRightWall.parent = room;
        pieceRightWall.position.x = -7.5;
        pieceRightWall.position.z = -5;

        const stageRoof = PRIMS.roof(
            "stageRoof",
            {
                largeur: 30,
                profondeur: 15,
                epaisseur: 0.1,
                materiau: matPlafond,
            },
            scene,
        );
        stageRoof.parent = room;
        stageRoof.position.y = 5;
        stageRoof.position.x = -7.5;

        const parquet = BABYLON.MeshBuilder.CreateGround("parquetMezzanine", { width: 15, height: 30 }, scene);
        parquet.material = matParquet;
        parquet.position.set(-7.5, 5.056, 0);
        parquet.parent = room;


        const baseboard1 = BABYLON.MeshBuilder.CreateBox(
            "baseboardEast",
            { width: 30, height: 0.45, depth: 0.18 },
            scene,
        );
        baseboard1.position.set(0, 0.25, -14.9);
        baseboard1.material = matBois;
        baseboard1.parent = room;

        const baseboard2 = BABYLON.MeshBuilder.CreateBox(
            "baseboardWest",
            { width: 30, height: 0.45, depth: 0.18 },
            scene,
        );
        baseboard2.position.set(0, 0.25, 14.9);
        baseboard2.material = matBois;
        baseboard2.parent = room;

        const baseboard3 = BABYLON.MeshBuilder.CreateBox(
            "baseboardBack",
            { width: 0.18, height: 0.45, depth: 29.6 },
            scene,
        );
        baseboard3.position.set(-14.9, 0.25, 0);
        baseboard3.material = matBois;
        baseboard3.parent = room;

        const goldStrip = BABYLON.MeshBuilder.CreateBox(
            "goldStrip",
            { width: 30, height: 0.08, depth: 0.04 },
            scene,
        );
        goldStrip.position.set(0, 4.8, -14.92);
        goldStrip.material = matOr;
        goldStrip.parent = room;

        const goldStrip2 = goldStrip.clone("goldStripWest");
        goldStrip2.position.set(0, 4.8, 14.92);

        // frise dorée en haut des murs du hall et de la mezzanine
        [
            { nom: "corniceEst", w: 30, d: 0.06, x: 0, z: -14.92 },
            { nom: "corniceOuest", w: 30, d: 0.06, x: 0, z: 14.92 },
            { nom: "corniceFond", w: 0.06, d: 30, x: -14.92, z: 0 },
        ].forEach((c) => {
            const b = BABYLON.MeshBuilder.CreateBox(c.nom, { width: c.w, height: 0.12, depth: c.d }, scene);
            b.position.set(c.x, 9.75, c.z);
            b.material = matOr;
            b.parent = room;
        });

        const beam = BABYLON.MeshBuilder.CreateBox(
            "centralBeam",
            { width: 30, height: 0.25, depth: 0.25 },
            scene,
        );
        beam.position.set(0, 9.7, 0);
        beam.material = matOr;
        beam.parent = room;

        const sallesZ = [10, 0, -10];
        const nomsSalles = [
            { sur: "Salle I", titre: "Paris, capitale des arts" },
            { sur: "Salle II", titre: "L'abstraction : Bauhaus & De Stijl" },
            { sur: "Salle III", titre: "L'Amérique du Jazz Age" },
        ];

        sallesZ.forEach((z, i) => {
            const facade = PRIMS.wallHole(
                "facadeSalle" + i,
                {
                    cloison: {
                        largeur: 10,
                        hauteur: 5,
                        epaisseur: 0.2,
                        materiau: materiau1,
                    },
                    trou: {
                        largeur: 4,
                        hauteur: 4,
                        epaisseur: 1,
                        position: new BABYLON.Vector3(0, -3.5, 0),
                    },
                },
                scene,
            );
            facade.parent = room;
            facade.rotation.y = Math.PI / 2;
            facade.position.set(0, 0, z);

            const porte = PRIMS.door(
                "porteSalle" + i,
                { largeur: 4, hauteur: 4, epaisseur: 0.08, materiau: matVerreNoir },
                scene,
            );
            porte.parent = room;
            porte.rotation.y = Math.PI / 2;
            porte.position.set(0, 0, z);

            [
                { w: 0.12, h: 3.12, dz: -2.06, y: 1.56 },
                { w: 0.12, h: 3.12, dz: 2.06, y: 1.56 },
                { w: 4.24, h: 0.12, dz: 0, y: 3.06 },
            ].forEach((m, k) => {
                const b = BABYLON.MeshBuilder.CreateBox("encadrement" + i + "_" + k, { width: 0.06, height: m.h, depth: m.w }, scene);
                b.position.set(0.13, m.y, z + m.dz);
                b.material = matOr;
                b.parent = room;
            });

            // panneau du nom de la salle au-dessus de la porte
            const panneau = PRIMS.sign("salle" + i, { largeur: 3.6, hauteur: 0.75, surtitre: nomsSalles[i].sur, titre: nomsSalles[i].titre }, scene);
            panneau.parent = room;
            panneau.rotation.y = VERS_PX;
            panneau.position.set(0.14, 3.95, z);

            // plafonnier de la salle
            const plafonnier = PRIMS.ceilingLight("salle" + i, { diametre: 1.0 }, scene);
            plafonnier.parent = room;
            plafonnier.position.set(-7.5, 4.93, z);
        });


        const matMarche = matBois;

        let nbMarches = 20;
        let profondeurMarche = 0.35;
        let largeurMarche = 2.5;
        let hauteurMarche = 0.25;
        const stairs = PRIMS.stairs(
            "stairs",
            {
                nbMarches: nbMarches,
                largeur: largeurMarche,
                hauteurMarche: hauteurMarche,
                profondeurMarche: profondeurMarche,
                materiau: matMarche,
            },
            scene,
        );

        stairs.rotation.y = -Math.PI / 2.0;
        stairs.position.x = nbMarches * profondeurMarche;
        stairs.position.z = 15 - largeurMarche / 2;


        const zBordEscalier = 15 - largeurMarche;
        const xBasEscalier = nbMarches * profondeurMarche;
        const hautEscalier = nbMarches * hauteurMarche;
        const hRampe = 1.0;

        const pied = new BABYLON.Vector3(xBasEscalier, hauteurMarche, zBordEscalier);
        const tete = new BABYLON.Vector3(profondeurMarche, hautEscalier, zBordEscalier);
        const enHaut = (p) => p.add(new BABYLON.Vector3(0, hRampe, 0));
        const verreEscalier = BABYLON.MeshBuilder.CreateRibbon(
            "verreEscalier",
            { pathArray: [[pied, tete], [enHaut(pied), enHaut(tete)]], sideOrientation: BABYLON.Mesh.DOUBLESIDE },
            scene,
        );
        verreEscalier.material = matVerre;
        verreEscalier.checkCollisions = true;
        verreEscalier.isPickable = false;
        verreEscalier.parent = room;
        const rampeEscalier = BABYLON.MeshBuilder.CreateTube("rampeEscalier", { path: [enHaut(pied), enHaut(tete)], radius: 0.03 }, scene);
        rampeEscalier.material = matOr;
        rampeEscalier.parent = room;
        for (let i = 0; i <= nbMarches; i += 5) {
            const k = Math.min(i, nbMarches - 1);
            const x = xBasEscalier - profondeurMarche * (k + 0.5);
            const y = hauteurMarche * (k + 1);
            const poteau = BABYLON.MeshBuilder.CreateCylinder("poteauEscalier" + i, { height: hRampe, diameter: 0.05 }, scene);
            poteau.position.set(x, y + hRampe / 2, zBordEscalier);
            poteau.material = matOr;
            poteau.parent = room;
        }

        const xBord = -0.2;
        const zDebut = -14.9;
        const zFin = zBordEscalier - 0.2;
        const yMezz = 5.05;
        const verreMezz = BABYLON.MeshBuilder.CreateBox("verreMezzanine", { width: 0.03, height: hRampe, depth: zFin - zDebut }, scene);
        verreMezz.position.set(xBord, yMezz + hRampe / 2, (zDebut + zFin) / 2);
        verreMezz.material = matVerre;
        verreMezz.checkCollisions = true;
        verreMezz.isPickable = false;
        verreMezz.parent = room;
        const rampeMezz = BABYLON.MeshBuilder.CreateTube("rampeMezzanine",
            { path: [new BABYLON.Vector3(xBord, yMezz + hRampe, zDebut), new BABYLON.Vector3(xBord, yMezz + hRampe, zFin)], radius: 0.03 }, scene);
        rampeMezz.material = matOr;
        rampeMezz.parent = room;
        const nbPoteaux = 11;
        for (let i = 0; i <= nbPoteaux; i++) {
            const poteau = BABYLON.MeshBuilder.CreateCylinder("poteauMezz" + i, { height: hRampe, diameter: 0.05 }, scene);
            poteau.position.set(xBord, yMezz + hRampe / 2, zDebut + (i * (zFin - zDebut)) / nbPoteaux);
            poteau.material = matOr;
            poteau.parent = room;
        }


        const daciaKingStatus = PRIMS.model(
            "daciaKingStatus",
            {
                fichier: "./assets/3d_glb/moses.glb",
                hauteur: 4,
            },
            scene,
        );

        daciaKingStatus.parent = room;
        daciaKingStatus.position.set(7, 0.3, 0);
        daciaKingStatus.rotation.y = Math.PI / 2;

        const socle = BABYLON.MeshBuilder.CreateBox("socleStatue", { width: 3.0, height: 0.3, depth: 3.0 }, scene);
        socle.position.set(7, 0.15, 0);
        socle.material = matNoir;
        socle.checkCollisions = true;
        socle.parent = room;
        const bandeauSocle = BABYLON.MeshBuilder.CreateBox("bandeauSocle", { width: 3.04, height: 0.04, depth: 3.04 }, scene);
        bandeauSocle.position.set(7, 0.27, 0);
        bandeauSocle.material = matOr;
        bandeauSocle.parent = room;

        PRIMS.registerArtwork(scene, {
            noeud: daciaKingStatus,
            info: infoOeuvre("moise"),
            oriente: false,
            rayon: 5.5,
            porteeRegard: 9,
            decalage: new BABYLON.Vector3(0, 2.2, 0),
        });

        const fauteuil = PRIMS.model(
            "fauteuil",
            {
                fichier: "./assets/3d_glb/fauteuil_jaune.glb",
                hauteur: 2,
            },
            scene,
        );

        fauteuil.parent = ouestWall;
        fauteuil.position.set(-10, 0.3, -3);
        fauteuil.rotation.y = - Math.PI / 2;

        [
            { x: -5.5, y: 0, z: 10, rot: 0 },
            { x: -5.0, y: 0, z: 0, rot: Math.PI / 2 },
            { x: -5.5, y: 0, z: -10, rot: 0 },
            { x: -8, y: 5.05, z: -6, rot: Math.PI / 2 },
            { x: -8, y: 5.05, z: 6, rot: Math.PI / 2 },
            { x: 7.5, y: 0, z: -10.5, rot: 0 },
        ].forEach((b, i) => {
            const banc = PRIMS.bench("banc" + i, { longueur: 2.2, materiau: matBois }, scene);
            banc.parent = room;
            banc.position.set(b.x, b.y, b.z);
            banc.rotation.y = b.rot;
        });


        [
            { x: 7, z: 0, bas: 7.4, haut: 9.575 },
            { x: 7.5, z: 8, bas: 7.4, haut: 9.95 },
            { x: 7.5, z: -8, bas: 7.4, haut: 9.95 },
            { x: -7.5, z: 7, bas: 8.4, haut: 9.95 },
            { x: -7.5, z: -7, bas: 8.4, haut: 9.95 },
        ].forEach((s, i) => {
            const lustre = PRIMS.pendant("lustre" + i, { tige: s.haut - s.bas, diametre: i < 3 ? 0.9 : 0.7 }, scene);
            lustre.parent = room;
            lustre.position.set(s.x, s.bas, s.z);
        });


        const enseigne = PRIMS.sign("enseigne", { largeur: 7, hauteur: 1.1, surtitre: "Musée des Années folles", titre: "1919 — 1929 · Art, jazz & modernité" }, scene);
        enseigne.parent = room;
        enseigne.position.set(7.5, 6.3, -14.9);

        const panneauMezz = PRIMS.sign("mezzanine", { largeur: 4.2, hauteur: 0.75, surtitre: "Mezzanine", titre: "Instantanés des Années folles" }, scene);
        panneauMezz.parent = room;
        panneauMezz.rotation.y = VERS_PX;
        panneauMezz.position.set(-14.9, 9.0, 0);


        ACCROCHAGE.forEach((a) => {
            const o = OEUVRES[a.id];
            const poster = PRIMS.poster(
                a.id,
                {
                    tableau: "./assets/posters/" + o.fichier,
                    hauteur: a.h,
                    largeur: a.h * o.ratio,
                    cadre: o.cadre,
                    spot: true,
                    halo: true,
                    info: infoOeuvre(a.id),
                },
                scene,
            );
            poster.parent = room;
            poster.position.set(a.x, a.y, a.z);
            poster.rotation.y = a.rot;
        });


        scene.materials.forEach((m) => {
            if (!(m.metadata && m.metadata.lumieresFixees)) m.maxSimultaneousLights = 10;
        });

        const glow = new BABYLON.GlowLayer("glow", scene, { mainTextureSamples: 4, blurKernelSize: 48 });
        glow.intensity = 0.7;
        glow.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
            if (mesh.metadata && mesh.metadata.glow) result.set(1.0, 0.85, 0.6, 1);
            else result.set(0, 0, 0, 0);
        };

        const pipeline = new BABYLON.DefaultRenderingPipeline("rendu", true, scene, [this.camera]);
        pipeline.samples = 4;
        pipeline.fxaaEnabled = true;
        pipeline.bloomEnabled = true;
        pipeline.bloomThreshold = 0.8;
        pipeline.bloomWeight = 0.2;
        pipeline.bloomKernel = 64;
        pipeline.bloomScale = 0.5;
        pipeline.sharpenEnabled = true;
        pipeline.sharpen.edgeAmount = 0.15;

        this.guide = new Guide(scene, this.camera);

        room.position.y = 0;

        return room;
    }
}

export { World };
