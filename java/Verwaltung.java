import java.util.ArrayList;

class Verwaltung{
    private static boolean geoeffnet;
    private static ArrayList<Bestellung> bestellungen;
    private ArrayList<Koch> koeche;
    private DB db;

    public Verwaltung(){
        bestellungen = new ArrayList<>();
        koeche = new ArrayList<>();
    }
   
    public boolean einfuegen(Bestellung neu){
        return bestellungen.add(neu);
    }

    public static Bestellung entnehemen(){
        Bestellung b = bestellungen.get(0);
        bestellungen.remove(bestellungen.get(0));
        return b;
    }

    public void schließen(){
        geoeffnet = false;
    }

    public void oeffnen(){
        geoeffnet = true;
    }

    public String toString() {
        return null;
    }

    public static boolean getGeoeffnet(){
        return geoeffnet;
    }

}