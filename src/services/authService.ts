// src/services/authService.ts
import { store } from "../store";
import { authSlice } from "../components/features/auth/store/authSlice";

// Interfaces
export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  fullName: string;
  phone?: string;
  company?: string;
  department?: string;
  role?: string;
}

export interface LoginResult {
  success: boolean;
  user?: any;
  error?: string;
}

export interface HealthCheckResult {
  status: "healthy" | "unhealthy";
  message?: string;
}

class AuthService {
  // Kiểm tra trạng thái đăng nhập
  isAuthenticated(): boolean {
    const state = store.getState();
    return state.auth.isAuthenticated;
  }

  // Lấy thông tin user hiện tại
  getCurrentUser() {
    const state = store.getState();
    return state.auth.user;
  }

  // Đăng nhập
  async login(
    email: string,
    password: string,
    rememberMe?: boolean
  ): Promise<LoginResult> {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, rememberMe })
      // });

      // Tạm thời mock login thành công
      const mockUser = {
        id: "1",
        email: email,
        name: "Người dùng",
        role: "admin",
        department: "IT",
      };

      store.dispatch(authSlice.actions.loginSuccess(mockUser));
      return { success: true, user: mockUser };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Đăng nhập thất bại" };
    }
  }

  // Đăng xuất
  logout(sessionId?: string): void {
    // TODO: Call logout API if sessionId provided
    // if (sessionId) {
    //   await fetch('/api/auth/logout', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ sessionId })
    //   });
    // }
    store.dispatch(authSlice.actions.logout());
  }

  // Lấy session hiện tại
  getCurrentSession() {
    const user = this.getCurrentUser();
    if (!user) return null;

    return {
      session_id: "mock-session-id", // TODO: Replace with real session ID
      user_id: user.id,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    };
  }

  // Kiểm tra quyền
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    // TODO: Implement permission logic based on user role
    return true;
  }

  // Kiểm tra session hết hạn
  isSessionExpired(): boolean {
    const session = this.getCurrentSession();
    if (!session) return true;

    return new Date() > session.expires_at;
  }

  // Health check
  async healthCheck(): Promise<HealthCheckResult> {
    try {
      // TODO: Replace with real API call
      // const response = await fetch('/api/health');
      // return await response.json();

      // Mock health check
      return { status: "healthy", message: "Server is running" };
    } catch (error) {
      return { status: "unhealthy", message: "Server connection failed" };
    }
  }

  // Đăng ký
  async register(data: RegisterData): Promise<LoginResult> {
    try {
      // TODO: Replace with real API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // Mock registration success
      const mockUser = {
        id: "2",
        email: data.email,
        name: data.name,
        role: "user",
        department: "General",
      };

      store.dispatch(authSlice.actions.loginSuccess(mockUser));
      return { success: true, user: mockUser };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Đăng ký thất bại" };
    }
  }

  // Quên mật khẩu
  async forgotPassword(
    email: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      // TODO: Replace with real API call
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // Mock forgot password
      return { success: true, message: "Email đã được gửi" };
    } catch (error) {
      console.error("Forgot password error:", error);
      return { success: false, message: "Gửi email thất bại" };
    }
  }
}

const authService = new AuthService();
export default authService;
