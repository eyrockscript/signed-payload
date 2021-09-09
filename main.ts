let crypto = require("crypto");
let jsonabc = require("jsonabc");
let message: string = "";

// secret shared key for validate payload integrity
let secret: string = "seceto compartido";

let payload = {
  enroller_user_id: "1",
  name: "Efren Islas (payer) / Kushki (collector)",
  email: "prueba@kushki.com",
  user_type: "collector",
  tax_id: "10496405",
  tax_address:
    "977acbd94f2d43e81ad9986f1f228af0657aa82c6a83f0606d5bb0fae18a0177",
  gloss: "prueba de enrollamiento",
  account: { type: "001", tax_id: "10496405", id: "1", owner_id: "001" },
  geo: { lat: 4.678591, lng: -74.049975 }
};

payload = jsonabc.sortObj(payload);
Object.keys(payload)
  .sort()
  .forEach((property: keyof Object) => {
    if ((property as string) === "signature") return;
    if (payload.hasOwnProperty(property)) {
      message += property + JSON.stringify(payload[property]);
    }
  });

let hmac = crypto.createHmac("sha256", secret);
hmac.setEncoding("hex");
hmac.write(message);
hmac.end();

document.getElementById("payload").innerHTML = JSON.stringify(
  payload,
  null,
  "\t"
);

document.getElementById("signature").innerHTML = hmac.read() as string;
