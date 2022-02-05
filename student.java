import java.util.*;
public class student {
    
    // stores json ids 
    static ArrayList<Integer> taken;
    static ArrayList<Integer> gr9;
    static ArrayList<Integer> gr10;
    static ArrayList<Integer> gr11;
    static ArrayList<Integer> gr12;

    public static void main(String[] args){
        System.out.println("testing java");
    }

    static boolean addClass(Course cl){
        if(taken.contains(cl)){
            taken.add(cl);
        }
        else{
            return false;
        }
        return true;
    }
    
    static class Course {
		String name;
        String prereq;
        int hw;
        String level;
        String category;

        public Course(String name, String prereq, int hw, String level, String category){
            this.name=name;
            this.prereq=prereq;
            this.hw=hw;
            this.level=level;
            this.category=category;
        }
	} 
}


