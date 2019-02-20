import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MSMainComponent } from "./app.component";

describe("MSMainComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MSMainComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(MSMainComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TQ-Angular-Tree'`, () => {
    const fixture = TestBed.createComponent(MSMainComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("TQ-Angular-Tree");
  });

  it("should render title in a h1 tag", () => {
    const fixture = TestBed.createComponent(MSMainComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to TQ-Angular-Tree!"
    );
  });
});
