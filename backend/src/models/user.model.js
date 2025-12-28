import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema( // 1. スキーマ定義(データ構造を決める)
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 1,
      maxLength: 30,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// before saving (.pre('save', ...)) any password we need to hash it
// ATT: asyncとnextは同時に使用しない
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return; // パスワードが修正されていなければハッシュ化しない
  this.password = await bcrypt.hash(this.password, 10); // 10はSalt rounds: 計算コスト(強度)
});

// compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema); // モデル作成(スキーマからモデル生成)
