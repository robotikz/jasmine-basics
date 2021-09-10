import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { AsyncExampleComponent } from "./async-example.component";

describe("AsyncExampleComponent", () => {
  let component: AsyncExampleComponent;
  let fixture: ComponentFixture<AsyncExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsyncExampleComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("setNameWithPromise should update the name in the template - waitForAsync", waitForAsync(() => {
    component.setNameWithPromise("Ann");
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector("div");
      expect(el.textContent.trim()).toBe("Ann");
    });
  }));

  it("setNameAfterMinute should assign the specified name to the class field name - fakeAsync", fakeAsync(() => {
    component.setNameAfterMinute("Alice");
    tick(60000);
    expect(component.name).toBe("Alice");
  }));

  it("asyncExample should return the specified name, after a second - fakeAsync", fakeAsync(() => {
    component.asyncExample("Bob").then(res => {
      expect(res).toBe("Bob");
    });
    tick(1000);
  }));

  it("asyncExample should return the specified name, after a second - waitForAsync", waitForAsync(() => {
    component.asyncExample("Alice").then(res => {
      expect(res).toBe("Alice");
    });
  }));

  it("asyncExample should return reject, if name is not specified - fakeAsync", fakeAsync(() => {
    component.asyncExample().then(null, err => {
      expect(err).toBe("имя не указано");
    });
    tick();
  }));

  it("promiseExample must assign the specified name to the class field - fakeAsync", fakeAsync(() => {
    component.promiseExample("Kate");
    tick(3000);
    expect(component.name).toBe("Kate");
  }));

  it("promiseExample should return a reject, in the absence of a name - fakeAsync", fakeAsync(() => {
    component.promiseExample().then(null, err => {
      expect(err).toBe("нет имени");
    });
    tick(3000);
  }));

  it("observableExample should return an observable with the specified name - fakeAsync", fakeAsync(() => {
    component.observableExample("Bob").subscribe(res => {
      expect(res).toBe("Bob");
    });
    tick(1000);
  }));

  it("observableExample should return an error, if there is no name - fakeAsync", fakeAsync(() => {
    component.observableExample().subscribe(null, err => {
      expect(err).toBe("нет имени");
    });
    tick(1000);
  }));
});
